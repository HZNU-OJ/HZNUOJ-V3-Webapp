import React from "react";
import ContestLayout from "@/pages/contest/layouts/ContestLayout";
import ProblemPage from "./ProblemPage";

const ProblemPageWrapper: React.FC<{}> = (props) => {
  return (
    <ContestLayout current={"dashboard"} disableHeader={true}>
      <ProblemPage />
    </ContestLayout>
  );
};

export default ProblemPageWrapper;
