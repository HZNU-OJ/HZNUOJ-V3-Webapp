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
}

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  return (
    <div className={style.root}>
      <div className={`am-panel am-panel-primary ${style.panel}`}>
        <div className={`${style["panel-header"]}`}>
          <span>
            <a href={`/user/${props.username}`}>{props.username}</a>
            &nbsp; commented {formatDateTime(props.publishTime)[1]}
          </span>
        </div>
        <div className={`${style["panel-body"]}`}>
          <LazyMarkdownContent content={props.content} noSanitize={true} />
        </div>
      </div>
    </div>
  );
};

export { DiscussionBox };
