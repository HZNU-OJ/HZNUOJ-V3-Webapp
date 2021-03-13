import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import style from "./DiscussionBox.module.less";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

import api from "@/api";

interface DiscussionBoxProps {}

const content = `
$$
f(x) = 2^x
$$
`;

const DiscussionBox: React.FC<DiscussionBoxProps> = (props) => {
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);

  async function getContentA() {
    const { requestError, response } = await api.app.getMd({ id: "a" });
    setContentA(content);
    // setContentA(response.content);
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
        <div className={`${style["panel-header"]}`}>
          <span>
            <a href="/user/Dup4">Dup4</a>
            &nbsp; commented 2021-01-31 15:30:38
          </span>
        </div>
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
