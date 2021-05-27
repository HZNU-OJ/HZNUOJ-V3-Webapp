import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Row, Col, Result } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import BasicLayout from "@/layouts/BasicLayout";
import style from "../auth.module.less";
import { Helmet } from "umi";

import { getCustomTitle } from "@/utils";

import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
  stripInvalidCharactersInEmailVerificationCode,
} from "@/utils/validators";

import api from "@/api";
import { useRecaptcha } from "@/utils/hooks";

interface RegisterFormProps {
  email: string;
  password: string;
  rtpPassword: string;
  username: string;
  emailVerificationCode: string;
}

const Register: React.FC<{}> = () => {
  const RATE_LIMITED_SEC = 60;

  const [steps, setSteps] = useState(0);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [
    SendEmailVerificationCodeLoading,
    setSendEmailVerificationCodeLoading,
  ] = useState(false);

  const recaptcha = useRecaptcha();

  async function registerAction(formProps: RegisterFormProps) {
    if (!isValidUsername(formProps.username)) {
      message.error("Username Invalid!");
      return;
    }

    if (formProps.password !== formProps.rtpPassword) {
      message.error("The two passwords entered are inconsistent!");
      return;
    }

    if (!isValidPassword(formProps.password)) {
      message.error("Password Invalid!");
      return;
    }

    {
      // check email and username availability
      const { requestError, response } = await api.auth.checkAvailability({
        username: formProps.username,
        email: formProps.email,
      });

      if (response) {
        let valid = true;
        if (!response.emailAvailable) {
          message.warning("Email has been used!");
          valid = false;
        }
        if (!response.usernameAvailable) {
          message.warning("Username has been used!");
          valid = false;
        }
        if (!valid) return;
      }
    }

    {
      // register
      const { requestError, response } = await api.auth.register(
        {
          username: formProps.username,
          email: formProps.email,
          emailVerificationCode: stripInvalidCharactersInEmailVerificationCode(
            formProps.emailVerificationCode,
          ),
          password: formProps.password,
        },
        recaptcha("Register"),
      );

      if (requestError) {
        message.error(requestError);
      } else if (response.error) {
        message.error(response.error);
      } else {
        message.success("Register successfully!");
        setSteps(1);
      }
    }
  }

  async function onFinish(formProps: RegisterFormProps) {
    setRegisterLoading(true);
    await registerAction(formProps);
    setRegisterLoading(false);
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
        type: "Register",
        locale: "en_US",
      },
      recaptcha("SendEmailVerifactionCode_Register"),
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

  return (
    <>
      <Helmet>
        <title>{getCustomTitle("Register")}</title>
      </Helmet>
      <BasicLayout current="enter">
        <div className={style.root}>
          {steps === 0 && (
            <div className={style.secondRoot}>
              <span className={style.title}>Register new account</span>

              <Form
                name="normal_register"
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
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
                  name="rtpPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Retype Password"
                  />
                </Form.Item>

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

                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                    }}
                    loading={registerLoading === true}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register
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
                        <a href="/forgot-password">Forgot password?</a>
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
              title="Congratulations on your successful registration!"
              subTitle={`Username: ${username} | Email: ${email}`}
              extra={[
                <Button type="primary" key="login" href="/login">
                  Go Login
                </Button>,
              ]}
            />
          )}
        </div>
      </BasicLayout>
    </>
  );
};

export default Register;
