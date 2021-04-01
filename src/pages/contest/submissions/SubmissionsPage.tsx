import React from "react";
import { useModel } from "umi";
import styles from "./SubmissionsPage.module.less";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";
import { useUrlQuery } from "@/utils/hooks";
import ContestLayout from "../layouts/ContestLayout";

interface SubmissionsProps {
  username: string;
}

const SubmissionsPage: React.FC<SubmissionsProps> = (props) => {
  const { initialState, loading } = useModel("@@initialState");
  const [urlQuery, setUrlQuery] = useUrlQuery({
    username: "",
  });

  return (
    <ContestLayout current={"submissions"}>
      <div className={styles.root}>
        <SubmissionsTable
          query={{
            submitter: urlQuery.username,
          }}
        />
      </div>
    </ContestLayout>
  );
};

export default SubmissionsPage;
