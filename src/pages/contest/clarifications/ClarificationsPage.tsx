import React, { useState, useEffect } from "react";
import ContestLayout from "../layouts/ContestLayout";
import { message, Skeleton } from "antd";
import { useParams } from "umi";
import { DiscussionBox } from "@/pages/discussion/view/components";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";

import api from "@/api";
import style from "./ClarificationsPage.module.less";

interface DiscussionViewPageParams {
  id: string;
}

const ClarificationsPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;

  const [fetchDataLoading, setFetchDataLoading] = useState(false);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const isMobile = useScreenWidthWithin(0, 577);
  const [editorValue, setEditorValue] = useState("");

  async function fetchData() {
    const {
      requestError,
      response,
    } = await api.discussion.getDiscussionAndReplies({
      locale: "en_US",
      discussionId: parseInt("1"),
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
      setFetchDataLoading(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContestLayout current={"clarifications"}>
        <div className={style.root}>
          <Skeleton
            loading={!fetchDataLoading}
            active
            title={true}
            paragraph={{ rows: 8 }}
          >
            <div className={style.boxList}>
              <div className={`${style.markdownEditor} ${style.left}`}>
                <LazyMarkDownEditor
                  height={isMobile ? "220" : "238"}
                  language={"markdown"}
                  value={editorValue}
                  onChange={(value) => setEditorValue(value)}
                  onSubmit={() => {}}
                />
              </div>
              <div className={`${style.discussionBox} ${style.left}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              <div className={`${style.discussionBox} ${style.right}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              <div className={`${style.discussionBox} ${style.right}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              <div className={`${style.discussionBox} ${style.right}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              <div className={`${style.discussionBox} ${style.left}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              <div className={`${style.discussionBox} ${style.right}`}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
            </div>
          </Skeleton>
        </div>
      </ContestLayout>
    </>
  );
};

export default ClarificationsPage;
