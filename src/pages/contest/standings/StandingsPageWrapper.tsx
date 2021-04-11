import React from "react";
import { Helmet } from "umi";
import ContestLayout from "@/pages/contest/layouts/ContestLayout";
import StandingsPage from "./StandingsPage";

const StandingsPageWrapper: React.FC<{}> = (props) => {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=1560 initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"
        />
      </Helmet>
      <ContestLayout current={"standings"} maxBodyWidth={"1560px"}>
        <StandingsPage />
      </ContestLayout>
    </>
  );
};

export default StandingsPageWrapper;
