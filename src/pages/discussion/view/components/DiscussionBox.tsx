import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import style from "./DiscussionBox.module.less";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

interface DiscussionBoxProps {
  content: string;
  username: string;
}

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  return (
    <div className={style.root}>
      <div className={`am-panel am-panel-primary ${style.panel}`}>
        <div className={`${style["panel-header"]}`}>
          <span>
            <a href={`/user/${props.username}`}>{props.username}</a>
            &nbsp; commented 2021-01-31 15:30:38
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
