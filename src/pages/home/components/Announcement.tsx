import { Tooltip } from "antd";
import style from "./Announcement.module.less";
import React from "react";

function getData() {
  const announcemnets = [
    {
      title:
        "The Hangzhou Normal U Qualification Trials for Zhejiang Provincial Collegiate Programming Contest 2020 Editorial",
      date: "2020-08-18",
    },
    {
      title:
        "The Hangzhou Normal U Qualification Trials for Zhejiang Provincial Collegiate Programming Contest 2020 Announcement",
      date: "2020-09-06",
    },
    { title: "ACM/ICPC集训队入队条件", date: "2020-01-01" },
    { title: "杭州师范大学ACM集训队近年情况统计", date: "2019-01-01" },
    { title: "F.A.Q.", date: "2018-01-01" },
  ];
  let html = [];
  announcemnets.forEach((announcemnet: any, index: number) => {
    html.push(
      <tr key={["announcemnet", index].join("-")}>
        <td style={{ textAlign: "left" }} className={"h-ellipsis"}>
          <a href="">
            <Tooltip placement="top" title={announcemnet.title}>
              <span>{announcemnet.title}</span>
            </Tooltip>
          </a>
        </td>
        <td style={{ textAlign: "right", fontFamily: "Georgia" }}>
          {announcemnet.date}
        </td>
      </tr>,
    );
  });
  return html;
}

const Announcement: React.FC<{}> = (props) => {
  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: "2px 5px", fontSize: 16 }}>
        Announcement
      </div>
      <table className="am-table">
        <thead>
          <tr>
            <th className={style.tableTitle}>Title</th>
            <th className={style.tableDate}>Date</th>
          </tr>
        </thead>
        <tbody>{getData()}</tbody>
      </table>
    </div>
  );
};

export { Announcement };
