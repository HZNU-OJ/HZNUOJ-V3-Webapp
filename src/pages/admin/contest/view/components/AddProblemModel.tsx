import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import api from "@/api";

interface AddProblemModelProps {
  contestId: number;
  visible: boolean;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddProblemModel: React.FC<AddProblemModelProps> = (props) => {
  const [form] = Form.useForm();

  interface AddProblemFormParams {
    problemId: number;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);
  async function submitAction(value: AddProblemFormParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.contest.addProblem({
      contestId: props.contestId,
      problemId: value.problemId,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success(`Problem added successfully!`);
      if (props.onCancel) {
        props.onCancel();
      }
    }
    setConfirmLoading(false);
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
          <Form.Item
            name="problemId"
            label="Problem ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProblemModel;
