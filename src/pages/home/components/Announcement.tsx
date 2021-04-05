import { Tooltip, Skeleton } from "antd";
import style from "./Announcement.module.less";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "@/utils/formatDateTime";

import api from "@/api";

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
  const [fetchLoading, setFetchLoading] = useState(true);
  const [tbody, setTbody] = useState(null);

  async function fetchData() {
    const { requestError, response } = await api.discussion.queryDiscussions({
      locale: "en_US",
      publisherId: 0,
      nonpublic: false,
      titleOnly: false,
      skipCount: 0,
      takeCount: 1000000,
    });

    if (requestError) {
    } else {
      let html = [];
      response.discussions = response.discussions.filter((item) =>
        [1, 3, 6].includes(item.meta.id),
      );
      response.discussions = response.discussions.sort(
        (a, b) => b.meta.id - a.meta.id,
      );
      response.discussions.forEach((item, index: number) => {
        const date = item.meta.editTime ?? item.meta.publishTime;
        html.push(
          <tr key={["announcemnet", index].join("-")}>
            <td style={{ textAlign: "left" }} className={"h-ellipsis"}>
              <a href={`/discussion/${item.meta.id}`}>
                <Tooltip placement="top" title={item.meta.title}>
                  <span style={{ fontWeight: "bold" }}>{item.meta.title}</span>
                </Tooltip>
              </a>
            </td>
            <td style={{ textAlign: "right", fontFamily: "Georgia" }}>
              <Tooltip placement="top" title={formatDateTime(date)[1]}>
                <span>{formatDateTime(date)[0]}</span>
              </Tooltip>
            </td>
          </tr>,
        );
      });
      setTbody(html);
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: "2px 5px", fontSize: 16 }}>
        Announcement
      </div>
      <Skeleton
        active
        title={true}
        paragraph={{ rows: 4 }}
        loading={fetchLoading}
      >
        <table className="am-table">
          <thead>
            <tr>
              <th className={style.tableTitle}>Title</th>
              <th className={style.tableDate}>Date</th>
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
      </Skeleton>
    </div>
  );
};

export { Announcement };
