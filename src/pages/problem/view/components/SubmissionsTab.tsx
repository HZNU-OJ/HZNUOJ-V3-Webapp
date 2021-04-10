import React, { useState } from "react";
import style from "./SubmitTab.module.less";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";

interface SubmissionsTabProps {
  problemId: number;
  contestId?: number;
}

const SubmissionsTab: React.FC<SubmissionsTabProps> = (props) => {
  return (
    <>
      <div className={style.root}>
        <SubmissionsTable
          query={{
            problemId: props.problemId,
            contestId: props.contestId,
          }}
        />
      </div>
    </>
  );
};

export { SubmissionsTab };
