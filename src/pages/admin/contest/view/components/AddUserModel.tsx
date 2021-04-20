import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import api from "@/api";

interface AddUserModelProps {
  contestId: number;
  visible: boolean;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddUserModel: React.FC<AddUserModelProps> = (props) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);
  async function submitAction(value: ApiTypes.ContestUser) {
    setConfirmLoading(true);

    const { requestError, response } = await api.contest.importContestUsers({
      contestId: props.contestId,
      contestUserList: [value],
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success(`User added successfully!`);
      if (props.onCancel) {
        props.onCancel();
      }
    }

    setConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={"Add User"}
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
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="Nickname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input type={"password"} />
          </Form.Item>
          <Form.Item
            name="notificationEmail"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input type={"email"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModel;
