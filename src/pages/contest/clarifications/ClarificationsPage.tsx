import React, { useState, useEffect } from "react";
import ContestLayout from "../layouts/ContestLayout";
import { message, Skeleton } from "antd";
import { useParams } from "umi";
import { DiscussionBox } from "@/pages/discussion/view/components";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import api from "@/api";
import style from "./ClarificationsPage.module.less";

interface ClarificationsPageParams {
  id: string;
}

const ClarificationsPage: React.FC<{}> = (props) => {
  const params = useParams() as ClarificationsPageParams;
  const isMobile = useScreenWidthWithin(0, 577);

  const [editorValue, setEditorValue] = useState("");
  const [
    onClarificationSubmitLoading,
    setOnClarificationSubmitLoading,
  ] = useState(false);
  const [createClarificationsCount, setCreateClarificationsCount] = useState(0);
  const [clarifications, setClarifications] = useState(
    [] as ApiTypes.ClarificationMetaDto[],
  );

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getClarifications({
      contestId: parseInt(params.id),
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      setClarifications(response.clarifications);
      setFetchDataLoading(false);
    }
  }

  async function onClarificationSubmit() {
    setOnClarificationSubmitLoading(true);
    const { requestError, response } = await api.contest.createClarification({
      contestId: parseInt(params.id),
      content: editorValue,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success("Send a Clarification Successfully!");
      setCreateClarificationsCount(
        (createClarificationsCount) => createClarificationsCount + 1,
      );
      setOnClarificationSubmitLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [createClarificationsCount]);

  function getOnReplyFunc(replyId: number) {
    return async (replyContent: string) => {
      const { requestError, response } = await api.contest.createClarification({
        contestId: parseInt(params.id),
        content: replyContent,
        replyId: replyId,
      });

      if (requestError) {
        message.error(requestError);
      } else if (response.error) {
        message.error(response.error);
      } else {
        setCreateClarificationsCount(
          (createClarificationsCount) => createClarificationsCount + 1,
        );
      }
    };
  }

  return (
    <>
      <ContestLayout current={"clarifications"}>
        <div className={style.root}>
          <Skeleton
            loading={fetchDataLoading}
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
                  onSubmitLoading={onClarificationSubmitLoading}
                  onSubmit={onClarificationSubmit}
                />
              </div>
              <>
                {clarifications.map((clarification, index) => {
                  const isRootClarification =
                    clarification.id === clarification.replyId;
                  return (
                    <div
                      key={index}
                      className={`${style.discussionBox} ${
                        isRootClarification ? style.left : style.right
                      }`}
                    >
                      <DiscussionBox
                        username={clarification.username}
                        content={clarification.content}
                        publishTime={clarification.publishTime}
                        onReply={
                          isRootClarification
                            ? getOnReplyFunc(clarification.replyId)
                            : null
                        }
                      />
                    </div>
                  );
                })}
              </>
            </div>
          </Skeleton>
        </div>
      </ContestLayout>
    </>
  );
};

export default ClarificationsPage;
