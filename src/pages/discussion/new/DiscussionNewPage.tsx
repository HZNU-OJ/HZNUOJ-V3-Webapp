import React, { useEffect, useState } from "react";
import { Input, Button, Radio, message } from "antd";
import BasicLayout from "@/layouts/BasicLayout";
import { useScreenWidthWithin } from "@/utils/hooks";
import style from "./DiscussionNewPage.module.less";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useRecaptcha } from "@/utils/hooks";
import api from "@/api";

const DiscussionNewPage: React.FC<{}> = (props) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const isMobile = useScreenWidthWithin(0, 577);
  const recaptcha = useRecaptcha();

  async function onSubmit() {
    setSubmitLoading(true);
    const { requestError, response } = await api.discussion.createDiscussion(
      {
        problemId: 0,
        title: title,
        content: content,
        isPublic: isPublic,
      },
      recaptcha("createDiscussion"),
    );

    setSubmitLoading(false);

    if (requestError) {
      message.error(requestError);
    } else {
      message.success("Create Sucessful!");
    }
  }

  return (
    <>
      <BasicLayout current={"discussions"}>
        <div className={style.root}>
          <div className={style.title}>
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
          </div>
          <div className={style.content}>
            <LazyMarkDownEditor
              height={isMobile ? "220" : "500"}
              language={"markdown"}
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>
          <div className={style.publicRadio}>
            <Radio.Group
              onChange={(e) => {
                setIsPublic(e.target.value);
              }}
              value={isPublic}
            >
              <Radio value={true}>Public</Radio>
              <Radio value={false}>Private</Radio>
            </Radio.Group>
          </div>
          <div className={style.submitBtn}>
            <Button
              style={{
                width: isMobile ? "100%" : "",
              }}
              type="primary"
              size={"middle"}
              onClick={onSubmit}
              loading={submitLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionNewPage;
