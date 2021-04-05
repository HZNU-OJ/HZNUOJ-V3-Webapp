import React, { useEffect, useState } from "react";
import { Breadcrumb, message, Skeleton } from "antd";
import { useParams } from "umi";

import Divider from "@/components/Divider";
import { DiscussionViewHeader, DiscussionBox } from "./components";

import BasicLayout from "@/layouts/BasicLayout";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin, useRecaptcha } from "@/utils/hooks";
import style from "./DiscussionViewPage.module.less";

import api from "@/api";

interface DiscussionViewPageParams {
  id: string;
}

const DiscussionViewPage: React.FC<{}> = (props) => {
  const params = useParams() as DiscussionViewPageParams;

  const recaptcha = useRecaptcha();

  const [replySubmitCount, setReplySubmitCount] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [replyCount, setReplyCount] = useState(0);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const [repliesHead, setRepliesHead] = useState(
    [] as ApiTypes.DiscussionReplyDto[],
  );

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
      queryRepliesType: "HeadTail",
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      console.log(response);
      setTitle(response.discussion.meta.title);
      setReplyCount(response.discussion.meta.replyCount);
      setContent(response.discussion.content);
      setUsername(response.discussion.publisher.username);
      setPublishTime(
        response.discussion.meta.editTime ??
          response.discussion.meta.publishTime,
      );
      setRepliesHead(response.repliesHead);
      setLoaded(true);
    }
  }

  async function onReply() {
    setSubmitLoading(true);
    const {
      requestError,
      response,
    } = await api.discussion.createDiscussionReply(
      {
        discussionId: parseInt(params.id),
        content: editorValue,
        isPublic: true,
      },
      recaptcha("createDiscussionReply"),
    );

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success("Reply Successfully!");
      setReplySubmitCount((replySubmitCount) => replySubmitCount + 1);
      setSubmitLoading(false);
    }
  }

  useEffect(() => {
    fetchDiscussion();
  }, [replySubmitCount]);

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
              <>
                {repliesHead.map((repliesHead, index) => (
                  <div className={style.discussionBox} key={index}>
                    <DiscussionBox
                      username={repliesHead.publisher.username}
                      content={repliesHead.content}
                      publishTime={
                        repliesHead.editTime ?? repliesHead.publishTime
                      }
                    />
                  </div>
                ))}
              </>
              <div className={style.markdownEditor}>
                <LazyMarkDownEditor
                  height={isMobile ? "220" : "380"}
                  language={"markdown"}
                  value={editorValue}
                  onChange={(value) => setEditorValue(value)}
                  onSubmit={onReply}
                  onSubmitLoading={submitLoading}
                />
              </div>
            </div>
          </Skeleton>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionViewPage;
