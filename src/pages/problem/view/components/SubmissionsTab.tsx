import React, { useState } from "react";
import { Spin } from "antd";
import style from "./SubmitTab.module.less";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";
import { Prompt } from "umi";

const SubmissionsTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  const [editorValue, setEditorValue] = useState("");

  const isMobile = useScreenWidthWithin(0, 577);

  return (
    <>
      <Prompt
        when={editorValue !== ""}
        message={(location) => {
          return window.confirm(
            `Be sure to leave this page? Your changes will not be saved.`,
          );
        }}
      />
      <div className={style.root}>
        {loading === false && (
          <div className={style.loading}>
            <Spin tip="代码加载中..."></Spin>
          </div>
        )}

        {loading === true && (
          <LazyMarkDownEditor
            height={isMobile ? "220" : "500"}
            language={"markdown"}
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
          />
        )}
      </div>
    </>
  );
};

export { SubmissionsTab };
