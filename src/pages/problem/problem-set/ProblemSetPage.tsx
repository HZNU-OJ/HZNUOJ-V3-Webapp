import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import style from "./ProblemSetPage.module.less";
import ProblemsTable from "../components/ProblemsTable";

const ProblemSetPage: React.FC<{}> = (props) => {
  return (
    <BasicLayout current={"problem_set"}>
      <div className={style.root}>
        <ProblemsTable />
      </div>
    </BasicLayout>
  );
};

export default ProblemSetPage;
