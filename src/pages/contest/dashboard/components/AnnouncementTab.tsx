import React, { useState, useEffect } from "react";

import { message } from "antd";
import Loading from "@/components/Loading";
import style from "./AnnouncementTab.module.less";
import { DiscussionBox } from "@/pages/discussion/view/components";

import api from "@/api";

const AnnouncementTab: React.FC<{}> = (props) => {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const {
      requestError,
      response,
    } = await api.discussion.getDiscussionAndReplies({
      locale: "en_US",
      discussionId: 3,
      getDiscussion: true,
    });

    if (requestError) {
      message.error(requestError);
    } else {
      setContent(response.discussion.content);
      setUsername(response.discussion.publisher.username);
      setPublishTime(
        response.discussion.meta.editTime ??
          response.discussion.meta.publishTime,
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={style.root}>
        {fetchDataLoading && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}
        {fetchDataLoading === false && (
          <div className={style.boxList}>
            <div className={style.discussionBox}>
              <DiscussionBox
                username={username}
                content={content}
                publishTime={publishTime}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnnouncementTab;
