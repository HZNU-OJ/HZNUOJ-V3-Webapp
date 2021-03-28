import React from "react";
import styles from "./SubmissionsPage.module.less";
import SubmissionsTable from "@/pages/submission/components/SubmissionsTable";
import { useUrlQuery } from "@/utils/hooks";
import ContestLayout from "../layouts/ContestLayout";

const SubmissionsPage: React.FC<{}> = (props) => {
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
