import React, { useEffect } from "react";
import { useParams, useModel } from "umi";
import { Row, Col, Affix } from "antd";
import SiderMenu from "@/components/SiderMenu";
import AdminLayout from "@/layouts/AdminLayout";
import { menuItem } from "@/interface/Menu.interface";
import { useRedirectLogin, useAuthToken } from "@/utils/hooks";
import style from "./ContestAdminLayout.module.less";
import { useScreenWidthWithin } from "@/utils/hooks";

function getSiderItemList(id: number) {
  const getLink = (component: string) => {
    return `/admin/contest/${component}/${id}`;
  };
  const siderItemList: menuItem[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      link: getLink("dashboard"),
    },
    {
      id: "problem",
      name: "Problem",
      link: getLink("problem"),
    },
    {
      id: "user",
      name: "User",
      link: getLink("user"),
    },
    {
      id: "email",
      name: "Email",
      link: getLink("email"),
    },
  ];
  return siderItemList;
}

interface ContestAdminLayoutProps {
  current: "dashboard" | "problem" | "user" | "email";
}

const ContestAdminLayout: React.FC<ContestAdminLayoutProps> = (props) => {
  interface ContestAdminParams {
    id: string;
  }

  const params: ContestAdminParams = useParams();
  const isMobile = useScreenWidthWithin(0, 768);

  const { initialState, loading } = useModel("@@initialState");
  const { getToken } = useAuthToken();
  const redirectLogin = useRedirectLogin();

  useEffect(() => {
    if (loading === false) {
      if (getToken() === "") {
        redirectLogin();
      }
    }
  }, [loading]);

  return (
    <>
      <AdminLayout current="contests">
        <div className={style.root}>
          <Row gutter={16} align="top">
            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
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

            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
              {props.children}
            </Col>
          </Row>
        </div>
      </AdminLayout>
    </>
  );
};

export default ContestAdminLayout;
