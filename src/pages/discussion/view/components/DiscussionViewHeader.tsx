import React from "react";

import { Row, Col, Statistic } from "antd";
import style from "./DiscussionViewHeader.module.less";

interface DiscussionViewHeaderProps {
  id: number;
  title: string;
  replyCount: number;
}

const DiscussionViewHeader: React.FC<DiscussionViewHeaderProps> = (props) => {
  return (
    <div className={style.discussionViewHeader}>
      <Row gutter={16} align="top">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <div className={style.left}>
            <div
              className={style.discussionTitle}
            >{`#${props.id}. ${props.title}`}</div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Statistic title="Replies" value={props.replyCount} />
        </Col>
      </Row>
    </div>
  );
};

export { DiscussionViewHeader };
