import React from "react";

import style from "./ContestHeader.module.less";

const title = "2020 Intelligent Video Coding Contest 1";

interface ContestHeaderProps {}

const ContestHeader: React.FC<ContestHeaderProps> = (props) => {
  return (
    <div className={style.contestHeader}>
      <div className={style.contestTitle}>{`${title}`}</div>
    </div>
  );
};

export default ContestHeader;
