import React from "react";
import ProblemLayout from "./components/ProblemLayout";

import { Form, Row, Col, Radio, Tooltip, Input, Button } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { useScreenWidthWithin } from "@/utils/hooks";

import style from "./DashboardPage.module.less";
import FormStyle from "@/less/Form.module.less";

const DashboardPage: React.FC<{}> = (props) => {
  const [form] = Form.useForm();

  const isMobile = useScreenWidthWithin(0, 768);

  async function onFinish() {}

  async function onValuesChange() {}

  return (
    <ProblemLayout current={"dashboard"}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item>
          <Form.Item name="problemType" label="Problem Type">
            <Input />
          </Form.Item>

          <div className={FormStyle["form-item-footer"]}>
            <span>Memory limit (between 4 MB and 1024 MB).</span>
          </div>
        </Form.Item>

        <Form.Item>
          <Form.Item name="timeLimit" label="Time Limit">
            <Input addonAfter="ms" />
          </Form.Item>

          <div className={FormStyle["form-item-footer"]}>
            <span>Time limit per test (between 250 ms and 15000 ms).</span>
          </div>
        </Form.Item>

        <Form.Item>
          <Form.Item name="memoryLimit" label="Memory Limit">
            <Input addonAfter="MiB" />
          </Form.Item>

          <div className={FormStyle["form-item-footer"]}>
            <span>Memory limit (between 4 MB and 1024 MB).</span>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              width: isMobile ? "100%" : "",
            }}
            type="primary"
            htmlType="submit"
            // loading={updateLoading === true}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ProblemLayout>
  );
};

export default DashboardPage;
