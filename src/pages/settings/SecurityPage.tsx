import React, { useEffect, useState } from "react";

import { Row, Col, Form, Input, Button, message } from "antd";
import { useLocation, useModel } from "umi";

import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";

import { isValidPassword, isValidEmail } from "@/utils/validators";

import SettingsLayout from "@/layouts/SettingsLayout";
import SiderMenu from "@/components/SiderMenu";
import { menuItem } from "@/interface/Menu.interface";
import { useScreenWidthWithin, useRecaptcha } from "@/utils/hooks";
import api from "@/api";

const SiderMenuItemList: menuItem[] = [
  {
    id: "change_password",
    name: "Change Password",
    link: "/settings/security?tab=change_password",
  },
  {
    id: "change_email",
    name: "Change Email",
    link: "/settings/security?tab=change_email",
  },
];

interface ChangePasswordFormProps {
  oldPassword: string;
  password: string;
  rtpPassword: string;
}

const ChangePasswordComponent: React.FC<{}> = (props) => {
  const { initialState } = useModel("@@initialState");

  const [submitLoading, setSubmitLoading] = useState(false);

  const [form] = Form.useForm();

  const isMobile = useScreenWidthWithin(0, 768);

  async function onFinishAction(formProps: ChangePasswordFormProps) {
    if (formProps.password !== formProps.rtpPassword) {
      message.error("The two passwords entered are inconsistent!");
      return;
    }

    if (!isValidPassword(formProps.password)) {
      message.error("Password Invalid!");
      return;
    }

    const { requestError, response } = await api.user.updateUserPassword({
      userId: initialState.userMeta.id,
      oldPassword: formProps.oldPassword,
      password: formProps.password,
    });

    if (response?.error) {
      message.warn("Change Password Failed.");
    } else {
      message.success("Change Password successfully!");
    }
  }

  async function onFinish(formProps: ChangePasswordFormProps) {
    setSubmitLoading(true);
    await onFinishAction(formProps);
    setSubmitLoading(false);
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPassword"
          label="Old password"
          rules={[
            {
              required: true,
              message: "Please input old password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="New password"
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>
        <Form.Item
          name="rtpPassword"
          label="Retype Password"
          rules={[
            {
              required: true,
              message: "Please retype new password!",
            },
          ]}
          required
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              width: isMobile ? "100%" : "",
            }}
            type="primary"
            htmlType="submit"
            loading={submitLoading === true}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

interface ChangeEmailFromProps {
  email: string;
  emailVerificationCode: string;
}

const ChangeEmailComponent: React.FC<{}> = (props) => {
  const { initialState, refresh, loading } = useModel("@@initialState");
  const recaptcha = useRecaptcha();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [
    SendEmailVerificationCodeLoading,
    setSendEmailVerificationCodeLoading,
  ] = useState(false);
  const [email, setEmail] = useState(initialState.userMeta.email);

  const [form] = Form.useForm();

  const isMobile = useScreenWidthWithin(0, 768);

  useEffect(() => {
    form.setFieldsValue({
      email: email,
    });
  }, [loading]);

  async function sendEmailVerificationCode() {
    if (!isValidEmail(email)) {
      message.error("Email invalid!");
      return;
    }

    setSendEmailVerificationCodeLoading(true);
    const { requestError, response } = await api.auth.sendEmailVerificationCode(
      {
        email: email,
        type: "ChangeEmail",
        locale: "en_US",
      },
      recaptcha("SendEmailVerifactionCode_ChangeEmail"),
    );

    if (requestError) {
      message.error("Sent failed, please try agein.");
    } else if (response.error) {
      if (response.error === "RATE_LIMITED") {
        message.warning("Sent too frequently!");
      } else if (response.error === "DUPLICATE_EMAIL") {
        message.warning("Email has been used!");
      } else {
        message.warning("Sent failed!");
      }
    } else {
      message.success("Sent successfully!");
    }

    setSendEmailVerificationCodeLoading(false);
  }

  async function onValuesChange(formProps: ChangeEmailFromProps) {
    if (formProps.hasOwnProperty("email")) {
      setEmail(formProps.email);
    }
  }

  async function onFinishAction(formProps: ChangeEmailFromProps) {
    const { requestError, response } = await api.user.updateUserSelfEmail(
      formProps,
    );
    if (response?.error) {
      message.warn("Change email failed!");
    } else {
      message.success("Change email successfully.");
      refresh();
    }
  }

  async function onFinish(formProps: ChangeEmailFromProps) {
    setSubmitLoading(true);
    await onFinishAction(formProps);
    setSubmitLoading(false);
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="emailVerificationCode"
          label="Email verification code"
          rules={[
            {
              required: true,
              message: "Please input your E-mail Verify Code!",
            },
          ]}
        >
          <Row gutter={[16, 0]}>
            <Col span={18}>
              <Input
                prefix={<SafetyOutlined className="site-form-item-icon" />}
              />
            </Col>

            <Col span={6}>
              <Button
                style={{
                  width: "100%",
                }}
                loading={SendEmailVerificationCodeLoading === true}
                onClick={sendEmailVerificationCode}
                type="primary"
                className="login-form-button"
              >
                Send
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              width: isMobile ? "100%" : "",
            }}
            type="primary"
            htmlType="submit"
            loading={submitLoading === true}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const SecurityPage: React.FC<{}> = (props) => {
  const location = useLocation();
  const [tab, setTab] = useState("change_password");

  useEffect(() => {
    const _tab = location?.query?.tab ?? "change_password";
    setTab(_tab);
  });

  return (
    <SettingsLayout current="security">
      <Row gutter={16} align="top">
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          {tab === "change_password" && <ChangePasswordComponent />}
          {tab === "change_email" && <ChangeEmailComponent />}
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <SiderMenu
            current={tab}
            menuItemList={SiderMenuItemList}
            direction={"left"}
          />
        </Col>
      </Row>
    </SettingsLayout>
  );
};

export default SecurityPage;
