import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "umi";
import { Row, Col, Statistic } from "antd";

import BasicLayout from "@/layouts/BasicLayout";

import style from "./ProblemViewPage.module.less";

import SiderMenu from "@/components/SiderMenu";
import Divider from "@/components/Divider";

import { ProblemViewHeader, StatementTab } from "./components";

import { menuItem } from "@/interface/Menu.interface";
interface ProblemViewPageParams {
  id: string;
}

const ProblemViewPage: React.FC<{}> = (props) => {
  const params: ProblemViewPageParams = useParams();
  const location = useLocation();
  const [tab, setTab] = useState("statement");

  const pathname = location.pathname;

  const SiderMenuItemList: menuItem[] = [
    {
      id: "statement",
      name: "Statement",
      link: `${pathname}?tab=statement`,
    },
    {
      id: "submit",
      name: "Submit",
      link: `${pathname}?tab=submit`,
    },
    {
      id: "submissions",
      name: "Submissions",
      link: `${pathname}?tab=submissions`,
    },
    {
      id: "statistics",
      name: "Statistics",
      link: `${pathname}?tab=statistics`,
    },
  ];

  useEffect(() => {
    const _tab = location?.query?.tab ?? "statement";
    setTab(_tab);
  });

  return (
    <>
      <BasicLayout current={"problem_set"}>
        <div className={style.root}>
          <ProblemViewHeader id={params.id} />
          <Divider />
          <Row gutter={16} align="top">
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 19, order: 1 }}
              xl={{ span: 19, order: 1 }}
            >
              {tab === "statement" && <StatementTab />}
            </Col>

            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 5, order: 2 }}
              xl={{ span: 5, order: 2 }}
            >
              <SiderMenu
                current={tab}
                menuItemList={SiderMenuItemList}
                direction={"right"}
              />
            </Col>
          </Row>
        </div>
      </BasicLayout>
    </>
  );
};

export default ProblemViewPage;
