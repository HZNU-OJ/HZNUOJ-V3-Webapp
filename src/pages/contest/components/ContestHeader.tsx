import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "umi";
import style from "./ContestHeader.module.less";
import { ProgressBig } from "./progress/ProgressBig";

interface ContestHeaderProps {
  contestName: string;
  startTime: number;
  endTime: number;
  frozenStartTime: number;
  frozenEndTime: number;
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
          frozen_start_time={props.frozenStartTime}
          frozen_end_time={props.frozenEndTime}
          history={history}
          search={location.search}
        />
      </>
    </div>
  );
};

export default ContestHeader;
