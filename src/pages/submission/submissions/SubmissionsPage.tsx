import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import styles from "./SubmissionsPage.module.less";
import SubmissionsTable from "../components/SubmissionsTable";

const SubmissionsPage: React.FC<{}> = (props) => {
  return (
    <BasicLayout current={"submissions"}>
      <div className={styles.root}>
        <SubmissionsTable />
      </div>
    </BasicLayout>
  );
};

export default SubmissionsPage;
