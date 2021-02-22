import Footer from "@/components/Footer";
import style from "./Basic.module.less";
import React, { useState } from "react";
interface topBarItem {
  id: string;
  name: string;
  link: string;
}

function topBarItemRender(current: string, itemList: topBarItem[]): string {
  let html = "";
  itemList.forEach((item: topBarItem) => {
    html += `<li class="${current === item.id ? "am-active" : ""}"><a href="${
      item.link
    }">${item.name}</a></li>`;
  });
  return html;
}

function topBar(brand: string, current: string) {
  const leftItemList = [
    { id: "contests", name: "Contests", link: "/contests" },
    { id: "problemSet", name: "Problem Set", link: "/problemset" },
    { id: "submissions", name: "Submissions", link: "/submissions" },
    { id: "users", name: "Users", link: "/users" },
    { id: "discussion", name: "Discussion", link: "/disscussion" },
  ];
  const rightItemList = [{ id: "enter", name: "Enter", link: "/login" }];
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
        <a href="/" >${brand}</a>
      </h1>
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          ${topBarItemRender(current, leftItemList)}
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
          ${topBarItemRender(current, rightItemList)}
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
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={topBar("HZNU Online Judge", props.current)}
    ></div>
  );
};

interface BasicLayoutProps {
  current: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  return (
    <>
      <Header current={props.current} />
      <div className={style.root}>
        <div className={style.secondRoot}>
          <div className={style.main}>{props.children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BasicLayout;
