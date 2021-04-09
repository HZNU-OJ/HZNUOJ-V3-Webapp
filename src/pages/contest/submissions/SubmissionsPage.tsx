import React from "react";
import { useParams } from "umi";
import styles from "./SubmissionsPage.module.less";
import ContestLayout from "../layouts/ContestLayout";
import SubmissionsInContestTable from "@/pages/contest/components/SubmissionsInContestTable";

interface SubmissionsParams {
  id: string;
}

const SubmissionsPage: React.FC<{}> = (props) => {
  const params: SubmissionsParams = useParams();

  return (
    <ContestLayout current={"submissions"}>
      <div className={styles.root}>
        <SubmissionsInContestTable
          username={null}
          contestId={parseInt(params.id)}
        />
      </div>
    </ContestLayout>
  );
};

export default SubmissionsPage;
