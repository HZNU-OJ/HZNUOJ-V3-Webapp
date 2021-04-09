import { useModel, useParams } from "umi";
import React, { useEffect, useState, createContext } from "react";
import { Statistic, message } from "antd";
const { Countdown } = Statistic;
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import style from "./ContestLayout.module.less";
import { menuItem } from "@/interface/menu.interface";
import Divider from "@/components/Divider";
import ContestHeader from "../components/ContestHeader";
import { getStatus } from "../components/progress/model";

import api from "@/api";

function topBarItemRender(current: string, itemList: menuItem[]): string {
  let html = "";
  itemList.forEach((item: menuItem) => {
    html += `<li class="${current === item.id ? "am-active" : ""}"><a href="${
      item.link
    }">${item.name}</a></li>`;
  });
  return html;
}

function userItemListRender(itemList: menuItem[][], username: string): string {
  let html = "";
  html += `<li class="am-dropdown" data-am-dropdown>`;
  html += `
  <a class='am-dropdown-toggle' data-am-dropdown-toggle href='javascript:;'>
  <span class='am-icon-user'></span>&nbsp;${username}&nbsp;<span class='am-icon-caret-down'></span>
  </a>`;
  html += `<ul class="am-dropdown-content">`;
  for (let i = 0; i < itemList.length; ++i) {
    itemList[i].forEach((item: menuItem) => {
      html += `<li><a href="${item.link}">${item.name}</a></li>`;
    });
    if (i < itemList.length - 1) html += `<li class="am-divider"></li>`;
  }
  html += `</ul>`;
  html += `</li>`;
  return html;
}

function topBar(
  brand: string,
  current: string,
  contestId: number,
  username?: string | null,
  id?: number | null,
  isAdmin?: boolean | null,
) {
  const leftItemList = [
    { id: "dashboard", name: "Dashboard", link: `/contest/${contestId}` },
    {
      id: "submissions",
      name: "Submissions",
      link: `/contest/${contestId}/submissions`,
    },
    {
      id: "standings",
      name: "Standings",
      link: `/contest/${contestId}/standings`,
    },
    {
      id: "clarifications",
      name: "Clarifications",
      link: `/contest/${contestId}/clarifications`,
    },
    // { id: "print", name: "Print", link: `/contest/print/${contestId}` },
  ];
  const enterItemList = [{ id: "enter", name: "Enter", link: "/login" }];

  const userItemList = [
    [
      ...(isAdmin
        ? [
            {
              id: "my_profile",
              name: "My Profile",
              link: `/user/${username}`,
            },
          ]
        : []),
      {
        id: "my_submissions",
        name: "My Submissions",
        link: `/submissions?username=${username ?? ""}`,
      },
      ...(isAdmin
        ? [
            {
              id: "my_discussions",
              name: "My Discussions",
              link: `/discussions?publisherId=${id ?? ""}`,
            },
          ]
        : []),
    ],
    isAdmin
      ? [
          {
            id: "polygon",
            name: "Polygon",
            link: "/polygon",
          },
          {
            id: "administration",
            name: "Administration",
            link: "/admin",
          },
        ]
      : [],
    [
      ...(isAdmin
        ? [
            {
              id: "settings",
              name: "Settings",
              link: "/settings",
            },
          ]
        : []),
      {
        id: "logout",
        name: "Logout",
        link: "/logout",
      },
    ],
  ] as menuItem[][];

  return {
    __html: `
    <header class="am-topbar-inverse am-topbar-fixed-toped" style="font-size: 16px; margin-top: 0px;">
    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-primary am-show-sm-only"
      data-am-collapse="{target: '#collapse-head'}">
      <span class="am-sr-only">导航切换</span>
      <span class="am-icon-bars"></span>
    </button>
    <div class="am-container ${style["h-header"]}">
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
      <ul class="am-nav am-nav-pills am-topbar-nav">
        <li>
          <a class="am-icon-chevron-left" href="/contests"> Back</a>
        </li>
          ${topBarItemRender(current, leftItemList)}
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
          ${
            username
              ? userItemListRender(userItemList, username)
              : topBarItemRender(current, enterItemList)
          }
          </ul>
        </div>
      </div>
    </div>
  </header>
    `,
  };
}
interface HeaderProps {
  current: string;
  contestId: number;
  username?: string | null;
  id?: number | null;
  isAdmin?: boolean | null;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={topBar(
        "Back",
        props.current,
        props.contestId,
        props.username,
        props.id,
        props.isAdmin,
      )}
    ></div>
  );
};

const PendingClock: React.FC<{}> = (props) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
  return (
    <>
      <div>
        <Countdown title="" value={deadline} format="D [Days] H : m : s " />
      </div>
    </>
  );
};

interface ContestLayoutProps {
  current: string;
  maxRootWidth?: string;
  maxBodyWidth?: string;
  disableHeader?: boolean;
}

interface ContestLayoutParams {
  id: string;
}

export const ContestContext = createContext(
  null as ApiTypes.GetContestResponseDto,
);

const ContestLayout: React.FC<ContestLayoutProps> = (props) => {
  const { initialState, loading } = useModel("@@initialState");
  const params: ContestLayoutParams = useParams();

  const [contest, setContest] = useState(
    null as ApiTypes.GetContestResponseDto,
  );
  const [contestStatus, setContestStatus] = useState(0);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getContest({
      id: parseInt(params.id),
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setContest(response);
      setContestStatus(
        getStatus(
          Date.parse(response.contestMeta.startTime) / 1000,
          Date.parse(response.contestMeta.endTime) / 1000,
          response.contestMeta.frozenStartTime
            ? Date.parse(response.contestMeta.frozenStartTime) / 1000
            : null,
          response.contestMeta.frozenEndTime
            ? Date.parse(response.contestMeta.frozenEndTime) / 1000
            : null,
        ),
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.$(".am-dropdown").dropdown();
  });

  return (
    <>
      {loading ||
        (fetchDataLoading && (
          <div
            style={{
              height: "calc(100vh)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        ))}

      {(loading || fetchDataLoading) === false && (
        <>
          <Header
            current={props.current}
            contestId={parseInt(params.id)}
            username={initialState?.userMeta?.username}
            id={initialState?.userMeta?.id}
            isAdmin={initialState?.userMeta?.isAdmin}
          />

          <div
            className={style.root}
            style={{
              maxWidth: props.maxRootWidth ?? "1560px",
            }}
          >
            <div className={style.secondRoot}>
              <div className={style.main}>
                {!props.disableHeader && (
                  <div className={style.contestHeader}>
                    <ContestHeader
                      contestName={contest.contestMeta.contestName}
                      startTime={
                        Date.parse(contest.contestMeta.startTime) / 1000
                      }
                      endTime={Date.parse(contest.contestMeta.endTime) / 1000}
                      frozenStartTime={
                        contest.contestMeta.frozenStartTime
                          ? Date.parse(contest.contestMeta.frozenStartTime) /
                            1000
                          : null
                      }
                      frozenEndTime={
                        contest.contestMeta.frozenEndTime
                          ? Date.parse(contest.contestMeta.frozenEndTime) / 1000
                          : null
                      }
                    />
                    <Divider />
                  </div>
                )}

                {contestStatus >= 0 && (
                  <ContestContext.Provider value={contest}>
                    <div
                      className={style.root}
                      style={{
                        maxWidth: props.maxBodyWidth ?? "1200px",
                      }}
                    >
                      {props.children}
                    </div>
                  </ContestContext.Provider>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContestLayout;
