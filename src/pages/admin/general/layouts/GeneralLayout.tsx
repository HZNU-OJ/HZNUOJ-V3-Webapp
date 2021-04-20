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
  {
    id: "announcement",
    name: "Announcement",
    link: `/admin/announcement`,
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
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 21, order: 1 }}
              xl={{ span: 21, order: 1 }}
            >
              {props.children}
            </Col>

            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 3, order: 2 }}
              xl={{ span: 3, order: 2 }}
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
