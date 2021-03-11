import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "umi";
import BasicLayout from "@/layouts/BasicLayout";

import style from "./SubmissionViewPage.module.less";

import { useScreenWidthWithin } from "@/utils/hooks";
import { CodeBox } from "@/components/CodeBox";

const code = `#include <bits/stdc++.h>

int main() {
  return 0;
}`;

interface SubmissionViewPageParams {
  id: string;
}

const SubmissionViewPage: React.FC<{}> = (props) => {
  const params: SubmissionViewPageParams = useParams();
  const location = useLocation();
  const isMobile = useScreenWidthWithin(0, 992);

  return (
    <BasicLayout current={"submissions"}>
      <div className={style.root}>
        <CodeBox language={"cpp"} code={code} />
      </div>
    </BasicLayout>
  );
};

export default SubmissionViewPage;
