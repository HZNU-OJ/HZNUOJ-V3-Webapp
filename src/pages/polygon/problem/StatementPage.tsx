import React from "react";
import ProblemLayout from "./components/ProblemLayout";

const StatementPage: React.FC<{}> = (props) => {
  return (
    <>
      <ProblemLayout current={"statement"}></ProblemLayout>
    </>
  );
};

export default StatementPage;
