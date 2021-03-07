import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Row, Col, Result } from "antd";
import { SafetyOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, history, useModel } from "umi";
import style from "../auth.module.less";
import BasicLayout from "@/layouts/BasicLayout";

import { useRecaptcha } from "@/utils/hooks";

import {
  isValidEmail,
  isValidPassword,
  stripInvalidCharactersInEmailVerificationCode,
} from "@/utils/validators";

import api from "@/api";

interface ForgotPasswordFormProps {
  email: string;
  password: string;
  rptpassword: string;
  emailVerificationCode: string;
}

const ForgotPassword: React.FC<{}> = () => {
  const RATE_LIMITED_SEC = 60;

  const [steps, setSteps] = useState(0);

  const [email, setEmail] = useState("");

  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [
    SendEmailVerificationCodeLoading,
    setSendEmailVerificationCodeLoading,
  ] = useState(false);

  const recaptcha = useRecaptcha();

  async function resetPasswordAction(formProps: ForgotPasswordFormProps) {
    if (formProps.password !== formProps.rptpassword) {
      message.error("The two passwords entered are inconsistent!");
      return;
    }

    if (!isValidPassword(formProps.password)) {
      message.error("Password Invalid!");
      return;
    }

    {
      // reset password
      const { requestError, response } = await api.auth.resetPassword(
        {
          email: formProps.email,
          newPassword: formProps.password,
          emailVerificationCode: stripInvalidCharactersInEmailVerificationCode(
            formProps.emailVerificationCode,
          ),
        },
        recaptcha("ResetPassword"),
      );

      if (requestError) {
        message.error("Reset Password failed, please try again!");
      }

      if (response) {
        message.success("Reset Password successfully!");
        setSteps(1);
      }
    }
  }

  async function onFinish(formProps: ForgotPasswordFormProps) {
    setResetPasswordLoading(true);
    await resetPasswordAction(formProps);
    setResetPasswordLoading(false);
  }

  async function sendEmailVerificationCode() {
    if (!isValidEmail(email)) {
      message.error("Email invalid!");
      return;
    }

    setSendEmailVerificationCodeLoading(true);
    const { requestError, response } = await api.auth.sendEmailVerificationCode(
      {
        email: email,
        type: "ResetPassword",
        locale: "en_US",
      },
      recaptcha("SendEmailVerifactionCode_ResetPassword"),
    );

    if (requestError) {
      message.error("Sent failed, please try agein.");
    } else if (response.error) {
      if (response.error === "RATE_LIMITED") {
        message.warning("Sent too frequently!");
      } else if (response.error === "NO_SUCH_USER") {
        message.warning("No such user!");
      } else {
        message.warning("Sent failed!");
      }
    } else {
      message.success("Sent successfully!");
    }

    setSendEmailVerificationCodeLoading(false);
  }

  return (
    <BasicLayout current="enter">
      <div className={style.root}>
        {steps === 0 && (
          <div className={style.secondRoot}>
            <span className={style.title}>Reset your password</span>

            <Form
              name="normal_forgot-password"
              style={{
                width: "100%",
                marginTop: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="emailVerificationCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your E-mail Verify Code!",
                  },
                ]}
              >
                <Row gutter={[16, 0]}>
                  <Col span={15}>
                    <Input
                      prefix={
                        <SafetyOutlined className="site-form-item-icon" />
                      }
                      placeholder="E-mail Verify Code"
                    />
                  </Col>

                  <Col span={9}>
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

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="rptpassword"
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Retype Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                  }}
                  loading={resetPasswordLoading === true}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>

                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Row gutter={[16, 0]}>
                    <Col style={{ textAlign: "left" }} span={8}>
                      <a href="/login">Login</a>
                    </Col>
                    <Col style={{ textAlign: "center" }} span={0}></Col>
                    <Col style={{ textAlign: "right" }} span={16}>
                      <a href="/register">Register</a>
                    </Col>
                  </Row>
                </div>
              </Form.Item>
            </Form>
          </div>
        )}

        {steps === 1 && (
          <Result
            status="success"
            title="Congratulations on your successful reset password!"
            subTitle={`Email: ${email}`}
            extra={[
              <Button type="primary" key="login" href="/login">
                Go Login
              </Button>,
            ]}
          />
        )}
      </div>
    </BasicLayout>
  );
};

export default ForgotPassword;
