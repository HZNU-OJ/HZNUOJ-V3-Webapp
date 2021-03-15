import React from "react";
import ProblemLayout from "./components/ProblemLayout";

import { Form, Row, Col, Input, Button, Select } from "antd";

const { Option } = Select;

import { useScreenWidthWithin } from "@/utils/hooks";

import style from "./DashboardPage.module.less";
import FormStyle from "@/less/Form.module.less";

const DashboardPage: React.FC<{}> = (props) => {
  interface DashboardFormProps {
    problemType: string;
    timeLimit: number;
    memoryLimit: number;
  }

  const info = [
    ["Problem", "sqrt-and-mul-ten"],
    ["Problem ID", "158773"],
    ["Owner", "Dup4"],
    ["Package", "version 2"],
  ];

  const [form] = Form.useForm();

  const isMobile = useScreenWidthWithin(0, 768);

  async function onFinish(formProps: DashboardFormProps) {
    console.log(formProps);
  }

  async function onValuesChange() {}

  return (
    <ProblemLayout current={"dashboard"}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={17} xl={17}>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            initialValues={{
              problemType: "traditional",
            }}
          >
            <Form.Item
              name="problemType"
              label="Problem Type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a option and change input text above">
                <Option value="traditional">Traditional</Option>
                <Option value="interaction">Interaction</Option>
              </Select>
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
        </Col>

        <Col xs={24} sm={24} md={24} lg={7} xl={7}>
          <div className={style.infoBox}>
            {info.map((item) => (
              <Row gutter={16}>
                <Col span={8}>
                  <p>
                    <strong>{item[0]}:</strong>
                  </p>
                </Col>
                <Col span={16}>{item[1]}</Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </ProblemLayout>
  );
};

export default DashboardPage;
