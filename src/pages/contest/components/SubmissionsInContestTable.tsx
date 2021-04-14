import React, { useContext } from "react";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import { getProblemRenderFunc } from "@/pages/contest/utils";

interface SubmissionsProps {
  username?: string;
  contestId?: number;
  problemId?: number;
}

const SubmissionsInContestTable: React.FC<SubmissionsProps> = (props) => {
  const contest = useContext(ContestContext);

  return (
    <SubmissionsTable
      query={{
        submitter: props.username,
        contestId: props.contestId,
        problemId: props.problemId,
      }}
      problemRender={getProblemRenderFunc(contest)}
      isContestSubmission={true}
    />
  );
};

export default SubmissionsInContestTable;
