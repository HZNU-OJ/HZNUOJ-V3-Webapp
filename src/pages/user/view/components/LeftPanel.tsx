import React from "react";
import { history } from "umi";
import UserAvatar from "@/components/UserAvatar";

import { Button } from "antd";
import style from "../UserViewPage.module.less";
import { ClockCircleOutlined } from "@ant-design/icons";

interface LeftPanelProps {
  userDetail: ApiTypes.GetUserProfileResponseDto;
}

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return (
    <>
      <UserAvatar userAvatar={props.userDetail.meta.avatar} imageSize={220} />
      <div className={style.username}>{props.userDetail.meta.username}</div>
      {props.userDetail?.hasPrivilege && (
        <div style={{ marginBottom: 10 }}>
          <Button
            size={"middle"}
            type={"primary"}
            style={{ width: "100%" }}
            onClick={() => history.push("/settings/profile")}
          >
            Edit Profile
          </Button>
        </div>
      )}
      <div>
        <ClockCircleOutlined />
        &nbsp;Joined January 22, 2019
      </div>
    </>
  );
};

export { LeftPanel };
