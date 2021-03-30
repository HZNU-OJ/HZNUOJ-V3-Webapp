import { Badge } from "antd";
import { ContestStatusColor } from "@/interface/Contest";

import style from "./StatusBadge.module.less";

export const StatusBadge = (status: string) => {
  return (
    <>
      <div className={[style.label, style[status]].join(" ")}></div>
      <b style={{ color: ContestStatusColor[status] }}>{status}</b>
    </>
    // <div style={{ fontSize: 14 }}>
    //   <Badge style={{ fontSize: 14}} color={ContestStatusColor[status]} />
    //   <b style={{ marginLeft: -5, color: ContestStatusColor[status] }}>
    //     {status}
    //   </b>
    // </div>
  );
};
