import { ContestStatusColor } from "@/interface/Contest";

import style from "./StatusBadge.module.less";

export const StatusBadge = (status: string) => {
  return (
    <>
      <div className={[style.label, style[status]].join(" ")}></div>
      <b style={{ color: ContestStatusColor[status] }}>{status}</b>
    </>
  );
};
