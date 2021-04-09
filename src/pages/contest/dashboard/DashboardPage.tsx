import React, { useContext, useEffect } from "react";
import { useModel } from "umi";
import ContestLayout, { ContestContext } from "../layouts/ContestLayout";

import { menuItem } from "@/interface/Menu.interface";
import { useParams, useLocation } from "umi";
import { useUrlQuery, useScreenWidthWithin } from "@/utils/hooks";
import { Row, Col, Affix } from "antd";
import SiderMenu from "@/components/SiderMenu";

import ProblemsTab from "./components/ProblemsTab";
import MySubmissionsTab from "./components/MySubmissionsTab";
import AnnouncementTab from "./components/AnnouncementTab";

import style from "./DashboardPage.module.less";

interface DashboardPageParams {
  id: string;
  pid: string;
}

const DashboardPage: React.FC<{}> = (props) => {
  const { initialState, loading } = useModel("@@initialState");

  const params: DashboardPageParams = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useScreenWidthWithin(0, 992);

  const [urlQuery, setUrlQuery] = useUrlQuery({
    tab: "problems",
  });

  const SiderMenuItemList: menuItem[] = [
    {
      id: "problems",
      name: "Problems",
      link: `${pathname}?tab=problems`,
    },
    {
      id: "my-submissions",
      name: "My Submissions",
      link: `${pathname}?tab=my-submissions`,
    },
    // {
    //   id: "announcement",
    //   name: "Announcement",
    //   link: `${pathname}?tab=announcement`,
    // },
  ];

  return (
    <ContestLayout current="dashboard">
      <div className={style.root}>
        <Row gutter={16} align="top">
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 21, order: 1 }}
            xl={{ span: 21, order: 1 }}
          >
            <>
              {urlQuery.tab === "problems" && (
                <div style={{ marginBottom: 30 }}>
                  <ProblemsTab />
                </div>
              )}
              {urlQuery.tab === "my-submissions" && (
                <MySubmissionsTab
                  username={initialState.userMeta.username}
                  contestId={parseInt(params.id)}
                />
              )}
              {/* {urlQuery.tab === "announcement" && <AnnouncementTab />} */}
            </>
          </Col>

          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 24, order: 2 }}
            lg={{ span: 3, order: 2 }}
            xl={{ span: 3, order: 2 }}
          >
            {isMobile && (
              <SiderMenu
                current={urlQuery.tab}
                menuItemList={SiderMenuItemList}
                direction={"right"}
              />
            )}

            {!isMobile && (
              <Affix offsetTop={10}>
                <SiderMenu
                  current={urlQuery.tab}
                  menuItemList={SiderMenuItemList}
                  direction={"right"}
                />
              </Affix>
            )}
          </Col>
        </Row>
      </div>
    </ContestLayout>
  );
};

export default DashboardPage;
