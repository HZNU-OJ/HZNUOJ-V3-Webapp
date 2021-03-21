import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import BasicLayout from "@/layouts/BasicLayout";
import { useScreenWidthWithin } from "@/utils/hooks";
import style from "./DiscussionNewPage.module.less";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";

const DiscussionNewPage: React.FC<{}> = (props) => {
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    console.log(title);
  }, [title]);

  const isMobile = useScreenWidthWithin(0, 577);

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
              // id="titleInput"
              // ref={(titleInput) => (titleInput = titleInput)}
              // onBlur={this.inputOnBlur}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className={style.content}>
            <LazyMarkDownEditor
              height={isMobile ? "220" : "500"}
              language={"markdown"}
              value={editorValue}
              onChange={(value) => setEditorValue(value)}
            />
          </div>
          <div className={style.submitBtn}>
            <Button
              style={{
                width: isMobile ? "100%" : "",
              }}
              type="primary"
              size={"middle"}
              onClick={() => {}}
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
