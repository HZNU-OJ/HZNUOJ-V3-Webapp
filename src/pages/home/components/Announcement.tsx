import { Tooltip, Skeleton } from "antd";
import style from "./Announcement.module.less";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "@/utils/formatDateTime";

import api from "@/api";

const Announcement: React.FC<{}> = (props) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [tbody, setTbody] = useState(null);

  async function fetchData() {
    const { requestError, response } = await api.homepage.getAnnouncements();

    if (requestError) {
      console.log(requestError);
    } else {
      let html = [];
      response.announcementMetas.forEach((announcement, index: number) => {
        const date = announcement.lastUpdateTime;
        html.push(
          <tr key={["announcemnet", index].join("-")}>
            <td style={{ textAlign: "left" }} className={"h-ellipsis"}>
              <a href={`/discussion/${announcement.discussionId}`}>
                <Tooltip placement="top" title={announcement.title}>
                  <span style={{ fontWeight: "bold" }}>
                    {announcement.title}
                  </span>
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
