import React from "react";

import { Row, Col, Statistic } from "antd";
import style from "./ProblemViewHeader.module.less";

const title = "Database optimization";
const clock = 2000;
const memory = 512;

interface ProblemViewHeaderProps {
  id: string;
}

const ProblemViewHeader: React.FC<ProblemViewHeaderProps> = (props) => {
  return (
    <div className={style.problemViewHeader}>
      <Row gutter={16} align="top">
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className={style.left}>
            <div className={style.problemTitle}>{`#${props.id}. ${title}`}</div>
            <div className={[style.tag, style.time].join(" ")}>{clock} ms</div>
            <div className={[style.tag, style.memory].join(" ")}>
              {memory} MiB
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Row gutter={16} align="top">
            <Col span={12}>
              <Statistic title="AC." value={1223} />
            </Col>
            <Col span={12}>
              <Statistic title="SUBS." value={256999} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { ProblemViewHeader };
