import React from "react";

import { Row, Col, Statistic } from "antd";
import style from "./DiscussionViewHeader.module.less";

const title = "2021 年退役 OIer 文化课交流群联合竞赛暨第二届“退群杯”预告";

interface DiscussionViewHeaderProps {
  id: string;
}

const DiscussionViewHeader: React.FC<DiscussionViewHeaderProps> = (props) => {
  return (
    <div className={style.discussionViewHeader}>
      <Row gutter={16} align="top">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <div className={style.left}>
            <div
              className={style.discussionTitle}
            >{`#${props.id}. ${title}`}</div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Statistic title="Replies" value={1223} />
        </Col>
      </Row>
    </div>
  );
};

export { DiscussionViewHeader };
