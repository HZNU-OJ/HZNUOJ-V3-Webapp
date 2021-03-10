import React, { useState } from "react";
import { Spin } from "antd";
import style from "./SubmitTab.module.less";
import LazyCodeEditor from "@/components/Editor/LazyCodeEditor";

const height = 520;

const SubmitTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="loading..."></Spin>
        </div>
      )}

      {loading === true && (
        <LazyCodeEditor
          placeholderHeight={height}
          value={""}
          language={"cpp"}
        />
      )}
    </div>
  );
};

export { SubmitTab };
