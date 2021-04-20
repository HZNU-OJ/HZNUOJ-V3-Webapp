import React, { useState } from "react";
import { Modal, Form, Input, message, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import api from "@/api";

interface AddContestModelProps {
  visible: boolean;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddContestModel: React.FC<AddContestModelProps> = (props) => {
  const [form] = Form.useForm();

  interface AddContestFormParams {
    contestName: string;
    contestDuringTime: any;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);
  async function submitAction(value: AddContestFormParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.contest.createContest({
      contestName: value.contestName,
      startTime: value.contestDuringTime[0].toDate(),
      endTime: value.contestDuringTime[1].toDate(),
      isPublic: false,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success(`Contest created successfully!`);
      if (props.onCancel) {
        props.onCancel();
      }
    }
    setConfirmLoading(false);
  }

  const RangePickerConfig = [
    {
      type: "obj" as const,
    },
  ];

  return (
    <>
      <Modal
        title={"Add Contest"}
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
            name="contestName"
            label="Contest Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contestDuringTime"
            label="During Time"
            rules={[{ required: true }]}
            {...RangePickerConfig}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddContestModel;
