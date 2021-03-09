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
  const [loading, setLoading] = useState(true);

  async function getContentA() {
    const { requestError, response } = await api.app.getMd({ id: "a" });

    setContentA(response.content);
    setLoading(false);
  }

  async function getContentB() {
    const { requestError, response } = await api.app.getMd({ id: "b" });

    setContentB(response.content);
    setLoading(false);
  }

  useEffect(() => {
    getContentA();
    getContentB();
  }, []);

  return (
    <>
      <Skeleton title={true} loading={loading} active>
        <AmazeUIDetails title="Description">
          <LazyMarkdownContent content={contentA} noSanitize={true} />
        </AmazeUIDetails>

        <AmazeUIDetails title="Input">
          <LazyMarkdownContent content={contentB} noSanitize={true} />
        </AmazeUIDetails>

        <AmazeUIDetails title="Output"></AmazeUIDetails>

        <AmazeUIDetails title="Example"></AmazeUIDetails>

        <AmazeUIDetails title="Note"></AmazeUIDetails>
      </Skeleton>
    </>
  );
};

export { StatementTab };
