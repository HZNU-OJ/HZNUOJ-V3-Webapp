import React from "react";
import { history } from "umi";
import UserAvatar from "@/components/UserAvatar";
import { formatUserRegisterTime } from "@/utils/formatDateTime";
import { Button, Space } from "antd";
import style from "../UserViewPage.module.less";

import {
  ClockCircleOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  MailOutlined,
  QqOutlined,
  GithubOutlined,
} from "@ant-design/icons";

interface LeftPanelProps {
  userDetail: ApiTypes.GetUserProfileResponseDto;
}

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return (
    <>
      <UserAvatar userAvatar={props.userDetail.meta.avatar} imageSize={220} />

      {props.userDetail.meta.nickname.length > 0 && (
        <div className={style.username}>{props.userDetail.meta.nickname}</div>
      )}

      {props.userDetail.meta.nickname.length === 0 && (
        <div className={style.username}>{props.userDetail.meta.username}</div>
      )}

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

      <div style={{ fontSize: 15 }}>
        <div>
          <ClockCircleOutlined />
          &nbsp;Joined{" "}
          {formatUserRegisterTime(props.userDetail.meta.registrationTime)}
        </div>

        {props.userDetail.information.organization.length > 0 && (
          <div>
            <TeamOutlined />
            &nbsp;{props.userDetail.information.organization}
          </div>
        )}

        {props.userDetail.information.location.length > 0 && (
          <div>
            <EnvironmentOutlined />
            &nbsp;{props.userDetail.information.location}
          </div>
        )}
      </div>

      <Space size={"middle"} style={{ fontSize: 24, marginTop: 10 }}>
        {props.userDetail.meta.email !== null && (
          <a
            href={`mailto:${props.userDetail.meta.email}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <MailOutlined />
          </a>
        )}

        {props.userDetail.information.qq.length > 0 && (
          <a
            href={`https://wpa.qq.com/msgrd?V=3&Uin=${props.userDetail.information.qq}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <QqOutlined />
          </a>
        )}

        {props.userDetail.information.github.length > 0 && (
          <a
            href={`https://github.com/${props.userDetail.information.github}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubOutlined />
          </a>
        )}
      </Space>
    </>
  );
};

export { LeftPanel };
