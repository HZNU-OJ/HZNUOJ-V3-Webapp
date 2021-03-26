import { useModel } from "umi";
import React, { useEffect } from "react";

import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

import style from "./PolygonLayout.module.less";

import { menuItem } from "@/interface/menu.interface";

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

function topBar(brand: string, current: string, username?: string | null) {
  const leftItemList = [
    { id: "problem", name: "Problem", link: "/polygon/problem" },
    // { id: "contest", name: "Contest", link: "/polygon/contest" },
  ];
  const userItemList = [
    [
      {
        id: "back_oj",
        name: "Back OJ",
        link: `/`,
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
      <h1 class="am-topbar-brand">
        <a href="/polygon" >${brand}</a>
      </h1>
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          ${topBarItemRender(current, leftItemList)}
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
          ${userItemListRender(userItemList, username)}
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
  username?: string | null;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={topBar("Polygon", props.current, props.username)}
    ></div>
  );
};

interface PolygonLayoutProps {
  current: string;
  maxWidth?: string;
}

const PolygonLayout: React.FC<PolygonLayoutProps> = (props) => {
  const { initialState, loading } = useModel("@@initialState");

  useEffect(() => {
    window.$(".am-dropdown").dropdown();
  });

  return (
    <>
      {loading === true && (
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
      )}
      {loading === false && (
        <>
          <Header
            current={props.current}
            username={initialState?.userMeta?.username}
          />
          <div
            className={style.root}
            style={{
              maxWidth: props.maxWidth ? props.maxWidth : "",
            }}
          >
            <div className={style.secondRoot}>
              <div className={style.main}>{props.children}</div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PolygonLayout;
