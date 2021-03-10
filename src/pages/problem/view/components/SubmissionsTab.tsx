import React, { useState } from "react";
import { Spin } from "antd";
import style from "./SubmitTab.module.less";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";
import { useScreenWidthWithin } from "@/utils/hooks";

const SubmissionsTab: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);

  const isMobile = useScreenWidthWithin(0, 577);

  return (
    <div className={style.root}>
      {loading === false && (
        <div className={style.loading}>
          <Spin tip="代码加载中..."></Spin>
        </div>
      )}

      {loading === true && (
        <LazyMarkDownEditor
          height={isMobile ? "220" : "500"}
          value={""}
          language={"cpp"}
        />
      )}
    </div>
  );
};

export { SubmissionsTab };
