import React, { useState } from "react";
import { Spin } from "antd";
import style from "./SubmitTab.module.less";
import LazyCodeBoxEditor from "@/components/Editor/LazyCodeBoxEditor";
import { useScreenWidthWithin } from "@/utils/hooks";

const SubmitTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  const isMobile = useScreenWidthWithin(0, 577);

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="loading..."></Spin>
        </div>
      )}

      {loading === true && (
        <LazyCodeBoxEditor
          height={isMobile ? "220" : "500"}
          value={""}
          language={"cpp"}
        />
      )}
    </div>
  );
};

export { SubmitTab };
