import React, { useState } from "react";
import style from "./SubmitTab.module.less";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";

interface SubmissionsTabProps {
  id: number;
}

const SubmissionsTab: React.FC<SubmissionsTabProps> = (props) => {
  return (
    <>
      <div className={style.root}>
        <SubmissionsTable
          query={{
            problemId: props.id,
          }}
        />
      </div>
    </>
  );
};

export { SubmissionsTab };
