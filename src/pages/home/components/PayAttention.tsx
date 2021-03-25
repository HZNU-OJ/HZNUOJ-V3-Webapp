import React from "react";

const PayAttention: React.FC<{}> = (props) => {
  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: "2px 5px", fontSize: 16 }}>
        Pay Attention
      </div>
      <div className="am-panel-bd">Kwords is so handsome.</div>
    </div>
  );
};

export { PayAttention };
