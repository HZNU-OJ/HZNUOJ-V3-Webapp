import React, { useEffect, useState } from "react";
import MarkdownContent from "@/markdown/MarkdownContent";

import { Skeleton } from "antd";

import api from "@/api";

const StatementTab: React.FC<{}> = (props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

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
        <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
          <div
            className="am-panel-hd"
            style={{ padding: "2px 5px", fontSize: 16 }}
          >
            Description
          </div>
          <div className="am-panel-bd" style={{ padding: "5px" }}>
            <MarkdownContent content={content} />
          </div>
        </div>

        <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
          <div
            className="am-panel-hd"
            style={{ padding: "2px 5px", fontSize: 16 }}
          >
            Input
          </div>
          <div className="am-panel-bd" style={{ padding: "5px" }}></div>
        </div>

        <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
          <div
            className="am-panel-hd"
            style={{ padding: "2px 5px", fontSize: 16 }}
          >
            Output
          </div>
          <div className="am-panel-bd" style={{ padding: "5px" }}></div>
        </div>

        <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
          <div
            className="am-panel-hd"
            style={{ padding: "2px 5px", fontSize: 16 }}
          >
            Example
          </div>
          <div className="am-panel-bd" style={{ padding: "5px" }}></div>
        </div>

        <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
          <div
            className="am-panel-hd"
            style={{ padding: "2px 5px", fontSize: 16 }}
          >
            Note
          </div>
          <div className="am-panel-bd" style={{ padding: "5px" }}></div>
        </div>
      </Skeleton>
    </>
  );
};

export { StatementTab };
