import React from "react";
import style from "../UserViewPage.module.less";

import { Row, Col, Statistic } from "antd";

const DataView: React.FC<{}> = (props) => {
  return (
    <>
      <div className={`${style.border} ${style.dataView}`}>
        <Row gutter={16} align="top">
          <Col span={8}>
            <Statistic title="AC." value={1223} />
          </Col>
          <Col span={8}>
            <Statistic title="SUBS." value={256999} />
          </Col>
          <Col span={8}>
            <Statistic title="Rating." value={2294} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export { DataView };
