import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, history, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import BasicLayout from '@/layouts/Basic';
import style from '../auth.less';

const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/user/settings';
      return;
    }
  }
  history.replace(redirect || '/user/settings');
};

const LoginPage: React.FC<{}> = () => {
  const { refresh } = useModel('@@initialState');
  const [loading, setLoading] = useState(0);

  let token = window.localStorage.wikiAuthToken;
  if (token && token != '') {
    history.replace('/user/settings');
    return null;
  }

  const onFinish = async function (values: any) {
    // await setLoading(1);
    // user.login(values, async function (response: any) {
    //     if (response && response.status == '1') {
    //         message.success('登录成功！');
    //         await refresh();
    //         replaceGoto();
    //     } else {
    //         message.error((response && response.message) || '账号或密码错误，请重试！');
    //     }
    //     setLoading(0);
    // });
  };

  return (
    <BasicLayout current="enter">
      <div className={style.root}>
        <div className={style.secondRoot}>
          <span className={style.title}>Login to your account</span>

          <Form name="normal_login" className={style.form} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username/E-mail!',
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
                { required: true, message: 'Please input your Password!' },
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
                  width: '100%',
                }}
                loading={loading > 0}
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
                  <Col style={{ textAlign: 'left' }} span={8}>
                    <a href="/register">Register</a>
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
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
