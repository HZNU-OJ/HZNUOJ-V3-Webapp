import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import ContestListTable from "../components/ContestListTable";
import style from "./ContestsPage.module.less";

const ContestsPage: React.FC<{}> = (props) => {
  return (
    <BasicLayout current={"contests"}>
      <div className={style.root}>
        <ContestListTable />
      </div>
    </BasicLayout>
  );
};

export default ContestsPage;
