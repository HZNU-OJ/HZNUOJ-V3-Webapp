import React, { useEffect, useState } from "react";
import MarkdownContent from "@/markdown/MarkdownContent";

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
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  async function getContent() {
    const { requestError, response } = await api.app.getMd();
    setContent(response.content);
    setLoading(false);
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Skeleton title={true} loading={loading} active>
        <AmazeUIDetails title="Description">
          <MarkdownContent content={content} />
        </AmazeUIDetails>

        <AmazeUIDetails title="Input"></AmazeUIDetails>

        <AmazeUIDetails title="Output"></AmazeUIDetails>

        <AmazeUIDetails title="Example"></AmazeUIDetails>

        <AmazeUIDetails title="Note"></AmazeUIDetails>
      </Skeleton>
    </>
  );
};

export { StatementTab };
