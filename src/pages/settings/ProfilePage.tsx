import { useModel } from "umi";
import React, { useEffect, useState } from "react";

import md5 from "blueimp-md5";

import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Skeleton,
  Tooltip,
  message,
} from "antd";

import { UserOutlined, MailOutlined } from "@ant-design/icons";

import SettingsLayout from "@/pages/settings/components/SettingsLayout";

import style from "./ProfilePage.module.less";

import { GithubIcon, QQIcon } from "@/icons";

import UserAvatar from "@/components/UserAvatar";

import api from "@/api";

import { useScreenWidthWithin } from "@/utils/hooks";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

type avatarType = "gravatar" | "qq" | "github";

interface UpdateProfileFormProps {
  username: string;
  email: string;
  organization: string;
  location: string;
  qq: string;
  github: string;
  publicEmail: boolean;
  avatarType: avatarType;
}

function getAvatarType(avatarInfo: string): avatarType {
  return avatarInfo.split(":")[0] as avatarType;
}

function getAvatarInfo(formProps: UpdateProfileFormProps): string {
  switch (formProps.avatarType) {
    case "gravatar":
      return "gravatar:";
    case "qq":
      return `qq:${formProps.qq}`;
    case "github":
      return `github:${formProps.github}`;
  }
}

function getAvatar(avatarType: avatarType, keys: any): ApiTypes.UserAvatarDto {
  const avatar: ApiTypes.UserAvatarDto = {
    type: avatarType,
    key: avatarType === "gravatar" ? md5(keys["gravatar"]) : keys[avatarType],
  };
  return avatar;
}

function getQQLink(qq: string): string {
  return `https://wpa.qq.com/msgrd?V=3&Uin=${qq}`;
}

function getGithubLink(github: string): string {
  return `https://github.com/${github}`;
}

const ProfilePage: React.FC<{}> = (props) => {
  const { initialState } = useModel("@@initialState");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();

  const [email, setEmail] = useState(null);
  const [qq, setQQ] = useState(null);
  const [github, setGithub] = useState(null);
  const [avatarType, setAvatarType] = useState(null);

  const isMobile = useScreenWidthWithin(0, 768);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { requestError, response } = await api.user.getUserProfile({
      username: initialState.userMeta.username,
    });
    if (response) {
      console.log(response);
      const _profile: UpdateProfileFormProps = {
        username: response.meta.username,
        email: response.meta.email,
        organization: response.information.organization,
        location: response.information.location,
        qq: response.information.qq,
        github: response.information.github,
        publicEmail: response.publicEmail,
        avatarType: getAvatarType(response.avatarInfo),
      };

      setAvatarType(_profile.avatarType);
      setEmail(_profile.email);
      setQQ(_profile.qq);
      setGithub(_profile.github);

      form.setFieldsValue(_profile);
      setLoading(false);
    }
  }

  async function onValuesChange(formProps: UpdateProfileFormProps) {
    if (formProps.hasOwnProperty("qq")) {
      setQQ(formProps.qq);
    }
    if (formProps.hasOwnProperty("github")) {
      setGithub(formProps.github);
    }
    if (formProps.hasOwnProperty("avatarType")) {
      setAvatarType(formProps.avatarType);
    }
  }

  async function onFinishAction(formProps: UpdateProfileFormProps) {
    const { requestError, response } = await api.user.updateUserProfile({
      username: formProps.username,
      email: formProps.email,
      publicEmail: formProps.publicEmail,
      avatarInfo: getAvatarInfo(formProps),
      nickname: "",
      bio: "",
      information: {
        organization: formProps.organization,
        location: formProps.location,
        url: "",
        telegram: "",
        qq: formProps.qq,
        github: formProps.github,
      },
      userId: initialState.userMeta.id,
    });

    if (response) {
      if (response?.error) {
        message.warn("Profile updated failed!");
      } else {
        message.success("Profile updated successfully.");
      }
    }
  }

  async function onFinish(formProps: UpdateProfileFormProps) {
    setUpdateLoading(true);
    await onFinishAction(formProps);
    setUpdateLoading(false);
  }

  return (
    <SettingsLayout current="profile">
      <Skeleton title={true} loading={loading} active>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Row gutter={16} align="top">
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <Form.Item>
                <Form.Item
                  name="username"
                  label="Username"
                  tooltip="Username is unique and required."
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    disabled
                  />
                </Form.Item>

                <div className={style["form-item-footer"]}>
                  <span>You can't change your username.</span>
                </div>
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  tooltip={{ title: "Email is unique and required." }}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    disabled
                  />
                </Form.Item>

                <div className={style["form-item-footer"]}>
                  <Form.Item name="publicEmail">
                    <Radio.Group>
                      <Tooltip
                        title="Make My Email Public."
                        placement="topLeft"
                      >
                        <Radio value={true}>Public</Radio>
                      </Tooltip>
                      <Tooltip title="Hide My Email." placement="topLeft">
                        <Radio value={false}>Private</Radio>
                      </Tooltip>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <div className={style["form-item-footer"]}>
                  <span>Goto the Security pane for changing Email.</span>
                </div>
              </Form.Item>

              <Form.Item
                name="organization"
                label="Organization"
                tooltip={{
                  title: "Your school, company or virtual organization.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Your school, company or virtual organization." />
              </Form.Item>

              <Form.Item
                name="location"
                label="Location"
                tooltip={{
                  title: "Your physical location.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Your physical location." />
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name="qq"
                  label="QQ"
                  tooltip={{
                    title: "e.g. 12345678",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input placeholder="e.g. 12345678" />
                </Form.Item>

                <div className={style["form-item-footer"]}>
                  {qq !== "" && (
                    <span>
                      <span style={{ fontSize: 16 }}>
                        <QQIcon />
                      </span>
                      &nbsp;
                      <span>
                        Your QQ link is:{" "}
                        <a target="_blank" href={getQQLink(qq)}>
                          {getQQLink(qq)}
                        </a>
                      </span>
                    </span>
                  )}
                </div>
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name="github"
                  label="Github"
                  tooltip={{
                    title: "Not including '@'",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input placeholder="Not including '@'" />
                </Form.Item>

                <div className={style["form-item-footer"]}>
                  {github !== "" && (
                    <span>
                      <span style={{ fontSize: 16 }}>
                        <GithubIcon />
                      </span>
                      &nbsp;
                      <span>
                        Your GitHub link is:{" "}
                        <a target="_blank" href={getGithubLink(github)}>
                          {getGithubLink(github)}
                        </a>
                      </span>
                    </span>
                  )}
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Row gutter={16} align="top">
                <Col xs={24} sm={12} md={12} lg={24} xl={24}>
                  <Form.Item name="avatar" label="Avatar">
                    <UserAvatar
                      userAvatar={getAvatar(avatarType, {
                        gravatar: email,
                        qq: qq,
                        github: github,
                      })}
                      imageSize={220}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={24} xl={24}>
                  <Form.Item name="avatarType">
                    <Radio.Group style={{ marginLeft: 5 }}>
                      <Tooltip
                        title="It is determined by your Email."
                        placement="topLeft"
                      >
                        <Radio style={radioStyle} value={"gravatar"}>
                          Gravatar
                        </Radio>
                      </Tooltip>
                      <Tooltip
                        title="It is determined by your QQ."
                        placement="topLeft"
                      >
                        <Radio style={radioStyle} value={"qq"}>
                          QQ avatar
                        </Radio>
                      </Tooltip>
                      <Tooltip
                        title="It is determined by your Github."
                        placement="topLeft"
                      >
                        <Radio style={radioStyle} value={"github"}>
                          Github avatar
                        </Radio>
                      </Tooltip>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item>
            <Button
              style={{
                width: isMobile ? "100%" : "",
              }}
              type="primary"
              htmlType="submit"
              loading={updateLoading === true}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </SettingsLayout>
  );
};

export default ProfilePage;
