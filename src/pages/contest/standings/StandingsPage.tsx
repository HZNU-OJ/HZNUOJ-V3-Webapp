import React, { useContext } from "react";
import { useParams, useLocation, useHistory } from "umi";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import { Loading } from "@/components/Loading";
import { SecondLevelMenu } from "./components/SecondLevelMenu";
import { Standings } from "./components/Standings";
import { Statistics } from "./components/Statistics";
import { Selected } from "./components/Selected";
import {
  fetchIntervalTime,
  getData,
  getMenu,
  getCurrentGroup,
  getTimeFlag,
  getOrganization,
  getCurrentOrganization,
  getConfig,
  getRun,
  getTeam,
} from "./model";
import { throttle, debounce } from "lodash";
import { Balloon } from "./components/Balloon";
import { Export } from "./components/Export";

import "./components/Standings/Standings.less";
import style from "./StandingsPage.module.less";

import api from "@/api";

interface BoardProps {
  contestId: number;
  contest: ApiTypes.GetContestResponseDto;
  location: any;
  history: any;
}

class Board extends React.Component<BoardProps> {
  contest_config: any = null;
  team: any = null;
  run: any = null;
  timer: any = null;

  fetchThrottled: any = null;

  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }

  async fetch() {
    const { requestError, response } = await api.contest.getStandingsData({
      contestId: this.props.contestId,
    });

    if (requestError) {
      console.error(requestError);
      // message.error(requestError);
    } else if (response.error) {
      console.error(response.error);
      // message.error(response.error);
    } else {
      let { contest_config, team, run } = getData(this.props.contest, response);
      if (contest_config !== null && team !== null && run !== null) {
        this.contest_config = contest_config;
        this.team = team;
        this.run = run;
      }
    }
  }

  async update(props: any) {
    if (this.state.loaded) {
      await this.fetchThrottled();
    } else {
      if (this.timer == null) {
        await this.fetch();
      } else {
        await this.fetchThrottled();
      }
    }

    if (
      this.contest_config === null ||
      this.team === null ||
      this.run === null
    ) {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.update(props);
      }, 1000);
      return;
    }

    document.title = this.contest_config?.contest_name;

    for (let team_id in this.team) {
      this.team[team_id]["all"] = 1;
    }

    const { menu_item, fgroup } = getMenu(this.contest_config);

    let menu_index = (() => {
      let menu_index: any = {};
      const params = new URLSearchParams(props.location.search);
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

    const timeFlag = getTimeFlag(this.contest_config, props.location.search);

    const currentGroup = getCurrentGroup(
      props.location.search,
      menu_item.group,
      fgroup,
    );

    const { current_contest_config, current_team, current_run } = (() => {
      const current_contest_config = getConfig(
        this.contest_config,
        currentGroup,
      );
      const current_team = getTeam(
        this.team,
        currentGroup,
        props.location.search,
      );
      const current_run = getRun(this.run, current_team, timeFlag);
      return { current_contest_config, current_team, current_run };
    })();

    this.setState({
      contest_config: this.contest_config,
      team: this.team,
      run: this.run,
      current_contest_config: current_contest_config,
      current_team: current_team,
      current_run: current_run,
      timeFlag: timeFlag,
      menu_item: menu_item,
      fgroup: fgroup,
      menu_index: menu_index,
      loaded: true,
      filter: currentGroup === "filter" ? true : false,
    });

    this.clearTimer();
    this.timer = setTimeout(() => {
      this.update(props);
    }, fetchIntervalTime);
  }

  async componentWillMount() {
    await this.update(this.props);
  }

  async componentDidMount() {}

  //props中的值发生改变时执行
  async componentWillReceiveProps(nextProps: any) {
    if (
      this.props.location?.pathname !== nextProps.location?.pathname ||
      this.props.location?.search !== nextProps.location?.search
    ) {
      await this.update(nextProps);
    }
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return true;
  }

  //组件卸载前的操作
  componentWillUnmount() {
    this.clearTimer();
  }

  constructor(props: any) {
    super(props);
    this.fetchThrottled = throttle(this.fetch, fetchIntervalTime);
  }

  state = {
    contest_config: {},
    team: {},
    run: [],
    current_contest_config: {},
    current_team: {},
    current_run: [],
    timeFlag: 0,
    loaded: false,
    menu_item: {},
    fgroup: [],
    menu_index: {
      type: 0,
      group: 0,
    },
    tab: 0,
    filter: false,
  };

  render() {
    return (
      <div className={style.root}>
        {this.state.loaded === false && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {this.state.loaded === true && (
          <>
            <div style={{ display: "flex" }}>
              <div style={{ float: "left" }}>
                <SecondLevelMenu
                  search={this.props.location.search}
                  history={this.props.history}
                  queryName={"group"}
                  siderItem={this.state.menu_item.group}
                  currentItem={
                    this.state.menu_item.group[this.state.menu_index.group]
                  }
                />
              </div>

              {this.state.contest_config?.organization && (
                <div style={{ flex: "1", maxWidth: "480px" }}>
                  <Selected
                    placeholder={[
                      this.state.contest_config.organization,
                      "Filter",
                    ].join(" ")}
                    search={this.props.location.search}
                    history={this.props.history}
                    queryName={"organization"}
                    selectedItem={getOrganization(this.state.team)}
                    currentSelected={getCurrentOrganization(
                      this.props.location.search,
                    )}
                  />
                </div>
              )}

              <div style={{ flex: "1" }}></div>
              <div style={{ float: "right" }}>
                <SecondLevelMenu
                  search={this.props.location.search}
                  history={this.props.history}
                  queryName={"type"}
                  siderItem={this.state.menu_item.type.slice().reverse()}
                  currentItem={
                    this.state.menu_item.type[this.state.menu_index.type]
                  }
                />
              </div>
            </div>

            <div className={style.body}>
              {this.state.menu_index.type === 0 && (
                <Standings
                  contest_config={this.state.current_contest_config}
                  team={this.state.current_team}
                  run={this.state.current_run}
                  currentGroup={this.state.menu_index.group}
                  filter={this.state.filter}
                  history={this.props.history}
                />
              )}

              {this.state.menu_index.type === 1 && (
                <Balloon
                  contest_config={this.state.current_contest_config}
                  team={this.state.current_team}
                  run={this.state.current_run}
                />
              )}

              {this.state.menu_index.type === 2 && (
                <Statistics
                  contest_config={this.state.current_contest_config}
                  team={this.state.current_team}
                  run={this.state.current_run}
                />
              )}

              {this.state.menu_index.type === 3 && (
                <Export
                  contest_config={this.state.current_contest_config}
                  team={this.state.current_team}
                  run={this.state.current_run}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

interface StandingsPageParams {
  id: string;
}

const StandingsPage: React.FC<{}> = (props) => {
  const params: StandingsPageParams = useParams();
  const contest = useContext(ContestContext);
  const location = useLocation();
  const history = useHistory();
  return (
    <Board
      contestId={parseInt(params.id)}
      contest={contest}
      location={location}
      history={history}
    />
  );
};

export default StandingsPage;
