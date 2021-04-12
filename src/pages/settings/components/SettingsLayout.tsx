import React, { useEffect } from "react";
import { useModel } from "umi";
import { Row, Col } from "antd";
import SiderMenu from "@/components/SiderMenu";
import BasicLayout from "@/layouts/BasicLayout";
import style from "./SettingsLayout.module.less";
import { menuItem } from "@/interface/Menu.interface";
import { useRedirectLogin, useAuthToken } from "@/utils/hooks";

interface SettingsLayoutProps {
  current: string;
}

const siderItemList: menuItem[] = [
  {
    id: "profile",
    name: "Profile",
    link: "/settings/profile",
  },
  {
    id: "security",
    name: "Security",
    link: "/settings/security",
  },
];

const SettingsLayout: React.FC<SettingsLayoutProps> = (props) => {
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
      <BasicLayout current="">
        <div className={style.root}>
          <Row gutter={16} align="top">
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <SiderMenu
                current={props.current}
                direction="left"
                menuItemList={siderItemList}
              />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              {props.children}
            </Col>
          </Row>
        </div>
      </BasicLayout>
    </>
  );
};

export default SettingsLayout;
