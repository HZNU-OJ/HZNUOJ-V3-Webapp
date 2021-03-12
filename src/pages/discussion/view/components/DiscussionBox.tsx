import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import style from "./DiscussionBox.module.less";

import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

import api from "@/api";

interface DiscussionBoxProps {}

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);

  async function getContentA() {
    const { requestError, response } = await api.app.getMd({ id: "a" });

    setContentA(response.content);
    setLoadingA(false);
  }

  async function getContentB() {
    const { requestError, response } = await api.app.getMd({ id: "b" });

    setContentB(response.content);
    setLoadingB(false);
  }

  useEffect(() => {
    getContentA();
  }, []);

  return (
    <div className={style.root}>
      <div className={`am-panel am-panel-primary ${style.panel}`}>
        <div className={`${style["panel-header"]}`}></div>
        <div className={`${style["panel-body"]}`}>
          <LazyMarkdownContent
            content={contentA}
            noSanitize={true}
            loading={loadingA}
          />
        </div>
      </div>
    </div>
  );
};

export { DiscussionBox };
