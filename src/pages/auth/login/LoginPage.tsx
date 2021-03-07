import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { history, useModel, useLocation } from "umi";
import { getPageQuery } from "@/utils/utils";
import BasicLayout from "@/layouts/BasicLayout";

import style from "../auth.module.less";

import { useAuthToken } from "@/utils/hooks";

import { isEmail } from "class-validator";
import api from "@/api";

interface LoginFormProps {
  usernameOrEmail: string;
  password: string;
}

const LoginPage: React.FC<{}> = () => {
  const { getToken, signIn } = useAuthToken();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const { refresh } = useModel("@@initialState");

  useEffect(() => {
    if (getToken() != "") {
      message.warning("Already Login!");
      history.replace("/");
      return null;
    }
  }, []);

  async function loginAction(formProps: LoginFormProps) {
    const { requestError, response } = await api.auth.login({
      [isEmail(formProps.usernameOrEmail)
        ? "email"
        : "username"]: formProps.usernameOrEmail,
      password: formProps.password,
    });

    if (response?.error) {
      if (response.error === "WRONG_PASSWORD") {
        message.error("Password Error!");
      } else {
        message.error("Login failed!");
      }
    } else if (response.token && response.username) {
      signIn(response.token);
      refresh();
      message.success(`Welcome back, ${response.username}!`);
      const redirectPath = location?.query?.redirect || "/";
      history.replace(redirectPath);
    }
  }

  const onFinish = async function (formProps: LoginFormProps) {
    setLoading(true);
    await loginAction(formProps);
    setLoading(false);
  };

  return (
    <BasicLayout current="enter">
      <div className={style.root}>
        <div className={style.secondRoot}>
          <span className={style.title}>Login to your account</span>

          <Form name="normal_login" className={style.form} onFinish={onFinish}>
            <Form.Item
              name="usernameOrEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your Username/E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username/E-mail"
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

            <Form.Item>
              <Button
                style={{
                  width: "100%",
                }}
                loading={loading === true}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>

              <div
                style={{
                  marginTop: 10,
                }}
              >
                <Row gutter={[16, 0]}>
                  <Col style={{ textAlign: "left" }} span={8}>
                    <a href="/register">Register</a>
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
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
