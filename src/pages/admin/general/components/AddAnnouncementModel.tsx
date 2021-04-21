import React, { useState } from "react";
import { Form, message, Modal, Input } from "antd";
import api from "@/api";

interface AddAnnouncementModelProps {
  visible: boolean;
  confirmLoading?: any;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddAnnouncementModel: React.FC<AddAnnouncementModelProps> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  interface AddAnnouncementModelParams {
    discussionId: number;
  }

  const [form] = Form.useForm();

  async function confirmAction(value: AddAnnouncementModelParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.homepage.addAnnouncement({
      discussionId: value.discussionId,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
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
        title={"Add Announcement"}
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
              name="discussionId"
              label="Discussion ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAnnouncementModel;
export { AddAnnouncementModel };
