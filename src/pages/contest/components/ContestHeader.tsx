import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "umi";
import style from "./ContestHeader.module.less";
import { ProgressBig } from "./progress/ProgressBig";

interface ContestHeaderProps {
  startTime: number;
  endTime: number;
  frozenTime: number;
  contestName: string;
}

const ContestHeader: React.FC<ContestHeaderProps> = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={style.contestHeader}>
      <>
        <div className={style.contestTitle}>{props.contestName}</div>
        <ProgressBig
          head_item={<></>}
          start_time={props.startTime}
          end_time={props.endTime}
          frozen_time={props.frozenTime}
          history={history}
          search={location.search}
        />
      </>
    </div>
  );
};

export default ContestHeader;
