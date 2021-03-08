import React, { useState } from "react";
import { CodeEditor } from "@/components/Editor";
import { Spin, Alert } from "antd";
import style from "./SubmitTab.module.less";

const SubmitTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="代码加载中..."></Spin>
        </div>
      )}

      {loading === true && (
        <div>
          <CodeEditor height={"520"} value={""} language={"cpp"} />
        </div>
      )}
    </div>
  );
};

export { SubmitTab };
