import React from "react";
import { history } from "umi";

import style from "./SiderMenu.module.less";
import { menuItem } from "@/interface/Menu.interface";

export interface SiderMenuProps {
  menuItemList: menuItem[];
  direction: "left" | "right";
  current: string;
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
  return (
    <div className={style["m-menu"]}>
      {props.menuItemList.map((item: menuItem, index: number) => (
        <div
          className={[
            style["m-menu-item"],
            style[props.direction],
            props.current === item.id ? style["active"] : "",
          ].join(" ")}
          key={index.toString()}
          onClick={() => {
            history.push(item.link);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SiderMenu;
