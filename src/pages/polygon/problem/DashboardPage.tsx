import React from "react";
import ProblemLayout from "./components/ProblemLayout";

const DashboardPage: React.FC<{}> = (props) => {
  return <ProblemLayout current={"dashboard"}></ProblemLayout>;
};

export default DashboardPage;
