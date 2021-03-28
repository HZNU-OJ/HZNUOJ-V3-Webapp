import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import styles from "./SubmissionsPage.module.less";
import SubmissionsTable from "../components/SubmissionsTable";
import { useUrlQuery } from "@/utils/hooks";

const SubmissionsPage: React.FC<{}> = (props) => {
  const [urlQuery, setUrlQuery] = useUrlQuery({
    username: "",
  });

  return (
    <BasicLayout current={"submissions"}>
      <div className={styles.root}>
        <SubmissionsTable
          query={{
            submitter: urlQuery.username,
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default SubmissionsPage;
