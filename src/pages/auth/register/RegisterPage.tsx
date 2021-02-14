import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Row, Col, Result } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Link, history, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import BasicLayout from '@/layouts/Basic';
import style from '../auth.less';

const Register: React.FC<{}> = () => {
  const [loading, setLoading] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [veryCodeLoading, setVeryCodeLoading] = useState(0);
  const [status, setStatus] = useState(0);

  const onFinish = async function (values: any) {
    // await setLoading(1);
    // user.register(values, async function (response: any) {
    //     if (response && response.status == '1') {
    //         message.success('注册成功！');
    //         setStatus("1");
    //     } else {
    //         message.error((response && response.message) || '注册失败，请重试！');
    //     }
    //     setLoading(0);
    // });
  };

  const sendEmailVeryCode = async function () {
    // await setVeryCodeLoading(1);
    // user.sendEmailVeryCode({email:email}, async function(response:any) {
    //     if (response && response.status == "1") {
    //         message.success(response.message || "发送成功！");
    //     } else {
    //         message.error((response && response.message) || "发送失败!");
    //     }
    //    setVeryCodeLoading(0);
    // });
  };

  return (
    <BasicLayout current="enter">
      <div className={style.root}>
        {status === 0 && (
          <div className={style.secondRoot}>
            <span className={style.title}>Register new account</span>

            <Form
              name="normal_register"
              style={{
                width: '100%',
                marginTop: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your Username!' },
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
                  { required: true, message: 'Please input your Password!' },
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
                  { required: true, message: 'Please confirm your Password!' },
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
                  { required: true, message: 'Please input your Email!' },
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
                name="verycode"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail Verify Code!',
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
                        width: '100%',
                      }}
                      loading={veryCodeLoading > 0}
                      onClick={sendEmailVeryCode}
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
                    width: '100%',
                  }}
                  loading={loading > 0}
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
                    <Col style={{ textAlign: 'left' }} span={8}>
                      <a href="/login">Login</a>
                    </Col>
                    <Col style={{ textAlign: 'center' }} span={0}></Col>
                    <Col style={{ textAlign: 'right' }} span={16}>
                      <a href="/forgot-password">Forgot password?</a>
                    </Col>
                  </Row>
                </div>
              </Form.Item>
            </Form>
          </div>
        )}

        {status === 1 && (
          <Result
            status="success"
            title="Congratulations on your successful registration!"
            subTitle={'Username: ' + username + ' ' + ' Email: ' + email}
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

export default Register;
