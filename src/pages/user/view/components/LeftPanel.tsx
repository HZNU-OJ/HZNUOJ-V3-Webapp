import React from "react";
import UserAvatar from "@/components/UserAvatar";
import style from "../UserViewPage.module.less";

import { ClockCircleOutlined } from "@ant-design/icons";

interface LeftPanelProps {
  profile: ApiTypes.GetUserProfileResponseDto;
}

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return (
    <>
      <UserAvatar userAvatar={props.profile.meta.avatar} imageSize={220} />
      <div className={style.username}>{props.profile.meta.username}</div>
      <div>
        <ClockCircleOutlined />
        &nbsp;Joined January 22, 2019
      </div>
    </>
  );
};

export { LeftPanel };
