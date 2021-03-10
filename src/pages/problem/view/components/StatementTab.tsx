import React, { useEffect, useState } from "react";
import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

import { Skeleton } from "antd";

import api from "@/api";

interface AmazeUIDetailsProps {
  hide?: boolean;
  title?: string;
}

const AmazeUIDetails: React.FC<AmazeUIDetailsProps> = (props) => {
  const [hide, setHide] = useState(false);

  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div
        className="am-panel-hd"
        style={{ padding: "2px 5px", fontSize: 16, cursor: "pointer" }}
        onClick={() => {
          setHide((hide: boolean) => !hide);
        }}
      >
        {props.title}
      </div>
      <div
        className="am-panel-bd"
        style={{ padding: "10px", display: hide ? "none" : "" }}
      >
        {props.children}
      </div>
    </div>
  );
};

const StatementTab: React.FC<{}> = (props) => {
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

  setTimeout(() => {
    getContentB();
  }, 2000);

  return (
    <>
      <Skeleton title={true} loading={false} active>
        <AmazeUIDetails title="Description">
          <LazyMarkdownContent
            content={contentA}
            noSanitize={true}
            loading={loadingA}
          />
        </AmazeUIDetails>

        <AmazeUIDetails title="Input">
          <LazyMarkdownContent
            content={contentB}
            noSanitize={true}
            loading={loadingB}
          />
        </AmazeUIDetails>

        <AmazeUIDetails title="Output"></AmazeUIDetails>

        <AmazeUIDetails title="Example"></AmazeUIDetails>

        <AmazeUIDetails title="Note"></AmazeUIDetails>
      </Skeleton>
    </>
  );
};

export { StatementTab };
