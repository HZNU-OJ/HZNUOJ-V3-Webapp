import React, { useState } from "react";
import { Form, message, Modal, Input, Select } from "antd";
const { Option } = Select;

interface AddProblemSectionProps {
  visible: boolean;
  onCancel: any;
  contentSections: ApiTypes.ProblemContentSectionDto[];
  setContentSections: any;
  samples: ApiTypes.ProblemSampleDataMemberDto[];
  setSamples: any;
  orderIdList: number[];
  setOrderIdList: any;
}

const AddSectionModel: React.FC<AddProblemSectionProps> = (props) => {
  interface AddProblemSectionParams {
    sectionTitle: string;
    type: "Text" | "Sample";
  }

  const [form] = Form.useForm();

  async function confirmAction(value: AddProblemSectionParams) {
    const orderId = props.contentSections.length;
    if (value.type === "Text") {
      props.setContentSections(
        [].concat(props.contentSections, {
          sectionTitle: value.sectionTitle,
          type: value.type,
          text: "",
        }),
      );
    } else if (value.type === "Sample") {
      const id = props.samples.length;
      props.setContentSections(
        [].concat(props.contentSections, {
          sectionTitle: `Example ${id}`,
          type: value.type,
          sampleId: id,
        }),
      );
      props.setSamples(
        [].concat(props.samples, {
          inputData: "",
          outputData: "",
        }),
      );
    }
    props.setOrderIdList([].concat(props.orderIdList, orderId));
    props.onCancel();
  }

  return (
    <>
      <Modal
        title={"Add Problem Section"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        onCancel={props.onCancel}
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
          <Form.Item
            name="type"
            label="Section Type"
            rules={[{ required: true }]}
          >
            <Select placeholder={"select a type for Problem Section"}>
              <Option value="Text">Text</Option>
              <Option value="Sample">Sample</Option>
            </Select>
          </Form.Item>

          <Form.Item name="sectionTitle" label="Section Name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSectionModel;
export { AddSectionModel };
