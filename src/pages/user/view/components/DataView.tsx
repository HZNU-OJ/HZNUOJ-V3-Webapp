import React from "react";
import style from "../UserViewPage.module.less";
import { Row, Col, Statistic } from "antd";

interface DataViewProps {
  acceptedProblemCount: number;
  submissionCount: number;
  rating: number;
}

const DataView: React.FC<DataViewProps> = (props) => {
  return (
    <>
      <div className={`${style.border} ${style.dataView}`}>
        <Row gutter={16} align="top">
          <Col span={8}>
            <Statistic title="AC." value={props.acceptedProblemCount} />
          </Col>
          <Col span={8}>
            <Statistic title="SUBS." value={props.submissionCount} />
          </Col>
          <Col span={8}>
            <Statistic title="Rating." value={props.rating} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export { DataView };
