import React, { useEffect } from "react";
import { useModel, history, useLocation, useParams } from "umi";
import { Row, Col, Affix } from "antd";
import SiderMenu from "@/components/SiderMenu";
import PolygonLayout from "@/layouts/PolygonLayout";
import { menuItem } from "@/interface/Menu.interface";
import { useRedirectLogin } from "@/utils/hooks";
import style from "./ProblemLayout.module.less";
import { useScreenWidthWithin } from "@/utils/hooks";

interface ProblemLayoutProps {
  current: string;
}

function getSiderItemList(id: number) {
  const getLink = (component: string) => {
    return `/polygon/problem/${component}/${id}`;
  };
  const siderItemList: menuItem[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      link: getLink("dashboard"),
    },
    {
      id: "statement",
      name: "Statement",
      link: getLink("statement"),
    },
    {
      id: "files",
      name: "Files",
      link: getLink("files"),
    },
    {
      id: "checker",
      name: "Checker",
      link: getLink("checker"),
    },
    {
      id: "validator",
      name: "Validator",
      link: getLink("validator"),
    },
    {
      id: "tests",
      name: "Tests",
      link: getLink("tests"),
    },
    {
      id: "solutions",
      name: "Solutions",
      link: getLink("solutions"),
    },
    {
      id: "manage_access",
      name: "Manage Access",
      link: getLink("manage_access"),
    },
  ];
  return siderItemList;
}

const ProblemLayout: React.FC<ProblemLayoutProps> = (props) => {
  interface ProblemParams {
    id: string;
  }

  const params: ProblemParams = useParams();

  const isMobile = useScreenWidthWithin(0, 768);

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
            <Col xs={24} sm={24} md={4} lg={3} xl={3}>
              {isMobile && (
                <SiderMenu
                  current={props.current}
                  menuItemList={getSiderItemList(parseInt(params.id))}
                  direction={"left"}
                />
              )}

              {!isMobile && (
                <Affix offsetTop={10}>
                  <SiderMenu
                    current={props.current}
                    menuItemList={getSiderItemList(parseInt(params.id))}
                    direction={"left"}
                  />
                </Affix>
              )}
            </Col>
            <Col xs={24} sm={24} md={20} lg={21} xl={21}>
              {props.children}
            </Col>
          </Row>
        </div>
      </PolygonLayout>
    </>
  );
};

export default ProblemLayout;
