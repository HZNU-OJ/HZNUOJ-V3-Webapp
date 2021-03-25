import React, { useState } from "react";
import { Form, message, Modal, Input } from "antd";
import api from "@/api";

interface AddJudgeMachineModelProps {
  visible: boolean;
  confirmLoading?: any;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddJudgeMachineModel: React.FC<AddJudgeMachineModelProps> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  interface AddJudgeMachineParams {
    name: string;
  }

  const [form] = Form.useForm();

  async function confirmAction(value: AddJudgeMachineParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.judgeClient.addJudgeClient({
      name: value.name,
      allowedHosts: [],
    });

    if (response?.error) {
      message.error(response.error);
    } else {
      message.success("Add Sucessfully!");
      if (props.onCancel) {
        props.onCancel();
      }
    }

    setConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={"Add Judge Machine"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={props.confirmLoading || confirmLoading}
        onCancel={props.onCancel ?? (() => {})}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              form.setFieldsValue(values);
              confirmAction(values);
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
            <Form.Item
              name="name"
              label="Name"
              tooltip="The Judge Machine Name."
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddJudgeMachineModel;
export { AddJudgeMachineModel };
