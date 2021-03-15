import React, { useEffect } from "react";
import { useModel, history, useLocation } from "umi";
import { Row, Col } from "antd";
import SiderMenu from "@/components/SiderMenu";
import PolygonLayout from "@/layouts/PolygonLayout";
import { menuItem } from "@/interface/Menu.interface";
import { useRedirectLogin } from "@/utils/hooks";
import style from "./ProblemLayout.module.less";

interface ProblemLayoutProps {
  current: string;
}

const siderItemList: menuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/settings/profile",
  },
  {
    id: "statement",
    name: "Statement",
    link: "/settings/security",
  },
  {
    id: "files",
    name: "Files",
    link: "/settings/security",
  },
  {
    id: "checker",
    name: "Checker",
    link: "/settings/security",
  },
  {
    id: "validator",
    name: "Validator",
    link: "/settings/security",
  },
  {
    id: "tests",
    name: "Tests",
    link: "/settings/security",
  },
  {
    id: "solutions",
    name: "Solutions",
    link: "/settings/security",
  },
  {
    id: "manage_access",
    name: "Manage Access",
    link: "/settings/security",
  },
];

const ProblemLayout: React.FC<ProblemLayoutProps> = (props) => {
  // const { initialState, loading } = useModel("@@initialState");
  // const redirectLogin = useRedirectLogin();

  // useEffect(() => {
  //   if (loading === false) {
  //     if (!initialState?.userMeta) {
  //       redirectLogin();
  //     }
  //   }
  // }, [loading]);

  return (
    <>
      <PolygonLayout current="problem">
        <div className={style.root}>
          <Row gutter={16} align="top">
            <Col xs={24} sm={24} md={20} lg={21} xl={21}>
              {props.children}
            </Col>
            <Col xs={24} sm={24} md={4} lg={3} xl={3}>
              <SiderMenu
                current={props.current}
                direction="right"
                menuItemList={siderItemList}
              />
            </Col>
          </Row>
        </div>
      </PolygonLayout>
    </>
  );
};

export default ProblemLayout;
