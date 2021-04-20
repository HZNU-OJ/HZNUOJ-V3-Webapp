import style from "./HomePage.module.less";
import BasicLayout from "@/layouts/BasicLayout";
import React from "react";
import { Row, Col } from "antd";
import {
  TopUsers,
  SubmissionStatics,
  Announcement,
  PayAttention,
} from "./components";

const HomePage: React.FC<{}> = (props) => {
  return (
    <BasicLayout current={""}>
      <div className={style.root}>
        <Row gutter={16} align="top">
          <Col xs={24} sm={24} md={24} lg={17} xl={18}>
            <Announcement />
            <SubmissionStatics />
          </Col>

          <Col xs={24} sm={24} md={24} lg={7} xl={6}>
            <PayAttention />
            {/* <TopUsers /> */}
          </Col>
        </Row>
      </div>
    </BasicLayout>
  );
};

export default HomePage;
