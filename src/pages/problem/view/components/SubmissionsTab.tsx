import React, { useState } from "react";
import { CodeEditorProps } from "@/components/Editor";
import { Spin } from "antd";
import style from "./SubmitTab.module.less";
import { dynamic } from "umi";
import Loading from "@/components/Loading";
import LoadingStyle from "@/less/Loading.module.less";

const height = 520;

const CodeEditorLoading = () => {
  return (
    <div
      className={LoadingStyle.center}
      style={{
        height: height,
      }}
    >
      <Loading />
    </div>
  );
};

const CodeEditor: React.FC<CodeEditorProps> = dynamic({
  loading: CodeEditorLoading,
  loader: async function () {
    const { CodeEditor } = await import("@/components/Editor");
    return CodeEditor;
  },
});

const SubmissionsTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="代码加载中..."></Spin>
        </div>
      )}

      {loading === true && (
        <CodeEditor height={height.toString()} value={""} language={"cpp"} />
      )}
    </div>
  );
};

export { SubmissionsTab };
