import React, { useEffect, useState } from "react";
import { Breadcrumb, message, Skeleton } from "antd";
import { useParams } from "umi";

import Divider from "@/components/Divider";
import { DiscussionViewHeader, DiscussionBox } from "./components";

import BasicLayout from "@/layouts/BasicLayout";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import style from "./DiscussionViewPage.module.less";

import api from "@/api";

interface DiscussionViewPageParams {
  id: string;
}

const DiscussionViewPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [replyCount, setReplyCount] = useState(0);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const isMobile = useScreenWidthWithin(0, 577);
  const [editorValue, setEditorValue] = useState("");

  async function fetchDiscussion() {
    const {
      requestError,
      response,
    } = await api.discussion.getDiscussionAndReplies({
      locale: "en_US",
      discussionId: parseInt(params.id),
      getDiscussion: true,
    });

    if (requestError) {
      message.error(requestError);
    } else {
      setTitle(response.discussion.meta.title);
      setReplyCount(response.discussion.meta.replyCount);
      setContent(response.discussion.content);
      setUsername(response.discussion.publisher.username);
      setPublishTime(response.discussion.meta.publishTime);
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchDiscussion();
  }, []);

  return (
    <>
      <BasicLayout current={"discussions"}>
        <div className={style.root}>
          <Skeleton
            loading={!loaded}
            active
            title={true}
            paragraph={{ rows: 8 }}
          >
            <div className={style.breadCrumb}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item href="/discussions">
                  Discussion
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">General</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <DiscussionViewHeader
              id={parseInt(params.id)}
              title={title}
              replyCount={replyCount}
            />
            <div className={style.titleDivider}>
              <Divider />
            </div>
            <div className={style.boxList}>
              <div className={style.discussionBox}>
                <DiscussionBox
                  username={username}
                  content={content}
                  publishTime={publishTime}
                />
              </div>
              {/* <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div>
            <div className={style.discussionBox}>
              <DiscussionBox />
            </div> */}
              {/* <div className={style.markdownEditor}>
              <LazyMarkDownEditor
                height={isMobile ? "220" : "500"}
                language={"markdown"}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
              />
            </div> */}
            </div>
          </Skeleton>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionViewPage;
