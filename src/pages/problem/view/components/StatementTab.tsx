import React from "react";

const StatementTab: React.FC<{}> = (props) => {
  return (
    <>
      <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
        <div
          className="am-panel-hd"
          style={{ padding: "2px 5px", fontSize: 16 }}
        >
          Description
        </div>
        <div className="am-panel-bd" style={{ padding: "5px" }}></div>
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
    </>
  );
};

export { StatementTab };
