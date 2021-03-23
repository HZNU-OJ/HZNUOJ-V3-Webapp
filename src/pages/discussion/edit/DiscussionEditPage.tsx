import React, { useEffect, useState } from "react";
import { Input, Button, Radio, message, Row, Col, Popconfirm } from "antd";
import { useHistory, useParams } from "umi";
import BasicLayout from "@/layouts/BasicLayout";
import { useScreenWidthWithin } from "@/utils/hooks";
import style from "./DiscussionEditPage.module.less";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useRecaptcha } from "@/utils/hooks";
import Loading from "@/components/Loading";
import api from "@/api";

interface DiscussionEditParams {
  id: string;
}

const DiscussionEditPage: React.FC<{}> = (props) => {
  const params: DiscussionEditParams = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const isMobile = useScreenWidthWithin(0, 577);
  const recaptcha = useRecaptcha();

  const [contentLoading, setContentLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [changePublicLoading, setChangePublicLoading] = useState(false);

  const history = useHistory();

  async function fetchDate() {
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
      setContent(response.discussion.content);
      setTitle(response.discussion.meta.title);
      setIsPublic(response.discussion.meta.isPublic);
      setContentLoading(false);
    }
  }

  useEffect(() => {
    fetchDate();
  }, []);

  async function onChangePublic() {
    setChangePublicLoading(true);
    const { requestError, response } = await api.discussion.setDiscussionPublic(
      {
        discussionId: parseInt(params.id),
        isPublic: isPublic ? false : true,
      },
    );

    setChangePublicLoading(false);

    if (response?.error) {
      message.error(response.error);
    } else {
      setIsPublic((isPublic) => !isPublic);
      message.success(
        `Set Discussion(id:${params.id}) ${
          isPublic ? "Public" : "Private"
        } Successfully!`,
      );
    }
  }

  async function onDelete() {
    setDeleteLoading(true);
    const { requestError, response } = await api.discussion.deleteDiscussion({
      discussionId: parseInt(params.id),
    });

    setDeleteLoading(false);

    if (response?.error) {
      message.error(response.error);
    } else {
      message.success(`Delete Discussion(id:${params.id}) Successfully!`);
      setTimeout(() => {
        history.push("/discussions");
      }, 500);
    }
  }

  async function onUpdate() {
    setSubmitLoading(true);
    const { requestError, response } = await api.discussion.updateDiscussion({
      discussionId: parseInt(params.id),
      title: title,
      content: content,
    });

    setSubmitLoading(false);

    if (response?.error) {
      message.error(response.error);
    } else {
      message.success("Update Sucessful!");
    }
  }

  return (
    <>
      <BasicLayout current={"discussions"}>
        <div className={style.root}>
          {contentLoading && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}
          {contentLoading === false && (
            <>
              <div className={style.head}>
                <Row align={"top"} gutter={16}>
                  <Col xs={24} sm={16} md={18}>
                    <Input
                      style={{
                        width: "100%",
                      }}
                      addonBefore="Title"
                      value={title}
                      disabled={submitLoading}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Col>

                  <Col xs={24} sm={4} md={3}>
                    <Popconfirm
                      title={`Are you sure to Set ${
                        isPublic ? "Private" : "Public"
                      } for this discussion?`}
                      onConfirm={onChangePublic}
                      okText="Yes"
                      cancelText="No"
                      placement="bottom"
                    >
                      <Button
                        style={{
                          width: "100%",
                          marginTop: isMobile ? "10px" : "",
                        }}
                        type="primary"
                        size={"middle"}
                        loading={changePublicLoading}
                      >
                        {isPublic ? "SetPrivate" : "SetPublic"}
                      </Button>
                    </Popconfirm>
                  </Col>
                  <Col xs={24} sm={4} md={3}>
                    <Popconfirm
                      title="Are you sure to delete this discussion?"
                      onConfirm={onDelete}
                      okText="Yes"
                      cancelText="No"
                      placement="bottom"
                    >
                      <Button
                        style={{
                          width: "100%",
                          marginTop: isMobile ? "10px" : "",
                        }}
                        type="primary"
                        size={"middle"}
                        loading={deleteLoading}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </div>
              <div className={style.content}>
                <LazyMarkDownEditor
                  height={isMobile ? "220" : "500"}
                  language={"markdown"}
                  value={content}
                  onChange={(value) => setContent(value)}
                />
              </div>
              <div className={style.submitBtn}>
                <Button
                  style={{
                    width: isMobile ? "100%" : "",
                  }}
                  type="primary"
                  size={"middle"}
                  onClick={onUpdate}
                  loading={submitLoading}
                >
                  Update
                </Button>
              </div>
            </>
          )}
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionEditPage;
