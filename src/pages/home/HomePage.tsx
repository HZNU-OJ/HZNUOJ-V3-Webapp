import style from "./HomePage.module.less";
import BasicLayout from "@/layouts/Basic";
import React from "react";
import { Row, Col } from "antd";
import {
  TopUsers,
  SubmissionStatics,
  Announcement,
  PayAttention,
} from "./components";
import { useScreenWidthWithin } from "@/utils/hooks";

const HomePage: React.FC<{}> = (props) => {
  return (
    <BasicLayout current={""}>
      <div className={style.root}>
        <Row gutter={16} align="top">
          <Col xs={24} sm={24} md={24} lg={17} xl={17}>
            <Announcement />
            <SubmissionStatics />
          </Col>

          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <PayAttention />
            <TopUsers />
          </Col>
        </Row>
      </div>
    </BasicLayout>
  );
};

export default HomePage;
