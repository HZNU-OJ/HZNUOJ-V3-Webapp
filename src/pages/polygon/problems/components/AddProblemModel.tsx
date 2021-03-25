import React, { useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useRecaptcha } from "@/utils/hooks";
const { Option } = Select;

import { problemTypeEnum } from "@/interface/problem.interface";

import api from "@/api";

interface AddProblemModelProps {
  visible: boolean;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddProblemModel: React.FC<AddProblemModelProps> = (props) => {
  const [form] = Form.useForm();
  const recaptcha = useRecaptcha();

  interface AddProblemFormParams {
    name: string;
    type: problemTypeEnum;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);
  async function submitAction(value: AddProblemFormParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.problem.createProblem(
      {
        type: value.type,
        statement: {
          localizedContents: [
            {
              locale: "en_US",
              title: value.name,
              contentSections: [],
            },
          ],
          samples: [],
          problemTagIds: [],
        },
      },
      recaptcha("CreateProblem"),
    );

    setConfirmLoading(false);

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success(`Problem(${value.name}) created successfully!`);
      if (props.onCancel) props.onCancel();
    }
  }

  return (
    <>
      <Modal
        title={"Add Problem"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={confirmLoading}
        onCancel={props.onCancel ?? (() => {})}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              form.setFieldsValue(values);
              submitAction(values);
            })
            .catch((info) => {
              console.log("Confirm Error:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{
            width: "98%",
            margin: 5,
            marginBottom: -40,
          }}
        >
          <Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select placeholder="Select a option and change input text above">
                <Option value="Traditional">Traditional</Option>
                <Option value="Interaction">Interaction</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true }]}
              tooltip="The name is not the name in the statement. It is just a sign. And can be duplicate."
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProblemModel;
