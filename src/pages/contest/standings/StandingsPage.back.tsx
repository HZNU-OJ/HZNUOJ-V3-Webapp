import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "umi";
import { message } from "antd";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import { Loading } from "@/components/Loading";
import { SecondLevelMenu } from "./components/SecondLevelMenu";
import { Standings } from "./components/Standings";
import { Statistics } from "./components/Statistics";
import { Selected } from "./components/Selected";
import standingsStyle from "./components/Standings/Standings.less";
import style from "./StandingsPage.module.less";
import { throttle, debounce } from "lodash";
import { Balloon } from "./components/Balloon";
import { Export } from "./components/Export";
import {
  fetchIntervalTime,
  getMenu,
  getCurrentGroup,
  getTimeFlag,
  getOrganization,
  getCurrentOrganization,
  getConfig,
  getRun,
  getTeam,
  getData,
} from "./model";

import api from "@/api";

interface StandingsPageParams {
  id: string;
}

const StandingsPage: React.FC<{}> = (props) => {
  const params: StandingsPageParams = useParams();
  const contest = useContext(ContestContext);
  const location = useLocation();
  const history = useHistory();

  const [timeFlag, setTimeFlag] = useState(0);
  const [menu_item, setMenu_Item] = useState({
    type: [],
    group: [],
  });
  const [fgroup, setFgroup] = useState([]);
  const [menu_index, setMenu_Index] = useState({
    type: 0,
    group: 0,
  });
  const [filter, setFilter] = useState(false);

  let raw_contest_config = {
    contest_name: "",
    problem_id: [],
    balloon_color: [],
    start_time: 0,
    end_time: 0,
    penalty: 0,
    frozen_time: 0,
  };
  let raw_team = null;
  let raw_run = [];

  const [current_contest_config, setCurrent_Contest_Config] = useState({
    contest_name: "",
    problem_id: [],
    balloon_color: [],
    start_time: 0,
    end_time: 0,
    penalty: 0,
    frozen_time: 0,
  });
  const [current_team, setCurrentTeam] = useState(null);
  const [current_run, setCurrentRun] = useState([]);

  let timer = null;
  function clearTimer() {
    timer && clearTimeout(timer);
  }

  const [firstFetchDataLoading, setFirstFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getStandingsData({
      contestId: parseInt(params.id),
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      const { contest_config, team, run } = getData(contest, response);
      raw_contest_config = contest_config;
      raw_team = team;
      raw_run = run;
    }
  }

  const fetchDataThrottled = throttle(fetchData, fetchIntervalTime);
  async function update() {
    if (firstFetchDataLoading === false) {
      await fetchDataThrottled();
    } else {
      if (timer == null) {
        await fetchData();
      } else {
        await fetchDataThrottled();
      }
    }

    if (raw_contest_config.start_time === 0) {
      clearTimer();
      timer = setTimeout(() => {
        update();
      }, 1000);
      return;
    }

    for (let team_id in raw_team) {
      raw_team[team_id]["all"] = 1;
    }

    const { menu_item, fgroup } = getMenu(raw_contest_config);

    let menu_index = (() => {
      let menu_index: any = {};
      const params = new URLSearchParams(location.search);
      for (let key in menu_item) {
        if (params.get(key)) {
          menu_index[key] = menu_item[key].indexOf(params.get(key));
          if (menu_index[key] === -1) menu_index[key] = 0;
        } else {
          menu_index[key] = 0;
        }
      }
      return menu_index;
    })();

    const timeFlag = getTimeFlag(raw_contest_config, location.search);

    const currentGroup = getCurrentGroup(
      location.search,
      menu_item.group,
      fgroup,
    );

    const { current_contest_config, current_team, current_run } = (() => {
      const current_contest_config = getConfig(
        raw_contest_config,
        currentGroup,
      );
      const current_team = getTeam(raw_team, currentGroup, location.search);
      const current_run = getRun(raw_run, current_team, timeFlag);
      return { current_contest_config, current_team, current_run };
    })();

    setCurrent_Contest_Config(current_contest_config);
    setCurrentTeam(current_team);
    setCurrentRun(current_run);
    setTimeFlag(timeFlag);
    setMenu_Item(menu_item);
    setFgroup(fgroup);
    setMenu_Index(menu_index);
    setFilter(currentGroup === "filter" ? true : false);

    setFirstFetchDataLoading(false);

    clearTimer();
    timer = setTimeout(() => {
      update();
    }, fetchIntervalTime);
  }

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    update();
  }, [location.search]);

  return (
    <div className={style.root}>
      {firstFetchDataLoading === true && (
        <div className={style.loading}>
          <Loading />
        </div>
      )}

      {firstFetchDataLoading === false && (
        <>
          <div style={{ display: "flex" }}>
            <div style={{ float: "left" }}>
              <SecondLevelMenu
                search={location.search}
                history={history}
                queryName={"group"}
                siderItem={menu_item?.group}
                currentItem={menu_item?.group[menu_index.group]}
              />
            </div>

            {raw_contest_config?.organization && (
              <div style={{ flex: "1", maxWidth: "480px" }}>
                <Selected
                  placeholder={[contest_config.organization, "Filter"].join(
                    " ",
                  )}
                  search={location.search}
                  history={history}
                  queryName={"organization"}
                  selectedItem={getOrganization(raw_team)}
                  currentSelected={getCurrentOrganization(location.search)}
                />
              </div>
            )}

            <div style={{ flex: "1" }}></div>
            <div style={{ float: "right" }}>
              <SecondLevelMenu
                search={location.search}
                history={history}
                queryName={"type"}
                siderItem={menu_item?.type.slice().reverse()}
                currentItem={menu_item?.type[menu_index.type]}
              />
            </div>
          </div>

          <div className={style.body}>
            {menu_index.type === 0 && (
              <Standings
                contest_config={current_contest_config}
                team={current_team}
                run={current_run}
                currentGroup={menu_index?.group}
                filter={filter}
              />
            )}

            {menu_index.type === 1 && (
              <Balloon
                contest_config={current_contest_config}
                team={current_team}
                run={current_run}
              />
            )}

            {menu_index.type === 2 && (
              <Statistics
                contest_config={current_contest_config}
                team={current_team}
                run={current_run}
              />
            )}

            {menu_index.type === 3 && (
              <Export
                contest_config={current_contest_config}
                team={current_team}
                run={current_run}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StandingsPage;
