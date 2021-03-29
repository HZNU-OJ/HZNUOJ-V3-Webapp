import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import style from "./DiscussionBox.module.less";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/formatDateTime";

import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

interface DiscussionBoxProps {
  content: string;
  username: string;
  publishTime: string;
  onReply?: any;
}

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  return (
    <div className={style.root}>
      <div className={`am-panel am-panel-primary ${style.panel}`}>
        <div className={`${style["panel-header"]}`}>
          <Row gutter={16} align={"top"}>
            <Col>
              <span>
                <a href={`/user/${props.username}`}>{props.username}</a>
                &nbsp; commented {formatDateTime(props.publishTime)[1]}
              </span>
            </Col>
          </Row>
        </div>
        <div className={`${style["panel-body"]}`}>
          <LazyMarkdownContent content={props.content} noSanitize={true} />
        </div>
      </div>
    </div>
  );
};

export { DiscussionBox };
