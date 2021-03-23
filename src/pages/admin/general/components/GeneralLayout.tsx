import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import style from "./GeneralLayout.module.less";
import { Row, Col, Affix } from "antd";
import { useScreenWidthWithin } from "@/utils/hooks";
import SiderMenu from "@/components/SiderMenu";
import { menuItem } from "@/interface/Menu.interface";
interface GeneralLayoutProps {
  current: string;
}

const SiderMenuItemList: menuItem[] = [
  {
    id: "judgeMachine",
    name: "Judge Machine",
    link: `/admin/judge-machine`,
  },
];

const GeneralLayout: React.FC<GeneralLayoutProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 992);

  return (
    <>
      <AdminLayout current={"general"}>
        <div className={style.root}>
          <Row gutter={16} align="top">
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 20 }}
              xl={{ span: 20 }}
            >
              {props.children}
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              {isMobile && (
                <SiderMenu
                  current={props.current}
                  menuItemList={SiderMenuItemList}
                  direction={"right"}
                />
              )}

              {!isMobile && (
                <Affix offsetTop={10}>
                  <SiderMenu
                    current={props.current}
                    menuItemList={SiderMenuItemList}
                    direction={"right"}
                  />
                </Affix>
              )}
            </Col>
          </Row>
        </div>
      </AdminLayout>
    </>
  );
};

export default GeneralLayout;
