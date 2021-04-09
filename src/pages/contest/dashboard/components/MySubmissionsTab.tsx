import React from "react";
import SubmissionInContestTable from "@/pages/contest/components/SubmissionsInContestTable";

interface MySubmissionsTabProps {
  contestId: number;
  username: string;
}

const MySubmissionsTab: React.FC<MySubmissionsTabProps> = (props) => {
  return (
    <SubmissionInContestTable
      username={props.username}
      contestId={props.contestId}
    />
  );
};

export default MySubmissionsTab;
