import React, { useState, useEffect } from "react";
import { Row, Col, Space, message, Popconfirm, Input } from "antd";
import {
  RightOutlined,
  DownOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const CloseArrow = () => (
  <DownOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

const OpenArrow = () => (
  <RightOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

const DeleteIcon = () => (
  <DeleteOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

const EditIcon = () => (
  <EditOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

import { Modal, Form } from "antd";

interface RenameSectionModel {
  visible: boolean;
  sectionName: string;
  onOk: (sectionName: string) => void;
  onCancel?: any;
}

const RenameSectionModel: React.FC<RenameSectionModel> = (props) => {
  const [form] = Form.useForm();
  interface RenameSectionModelParams {
    sectionName: string;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);
  async function submitAction(value: RenameSectionModelParams) {
    setConfirmLoading(true);
    props.onOk(value.sectionName);
    setConfirmLoading(false);
  }

  useEffect(() => {
    form.setFieldsValue({
      sectionName: props.sectionName,
    });
  }, [props.visible]);

  return (
    <>
      <Modal
        title={"Rename Section"}
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
            <Form.Item
              name="sectionName"
              label="Section Name"
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

interface EditorWrapperProps {
  title: string;
  sectionName: string;
  visible?: boolean;
  onDelete?: any;
  onEditOk: (sectionName: string) => void;
}

const EditorWrapper: React.FC<EditorWrapperProps> = (props) => {
  const [visible, setVisible] = useState(props.visible ?? true);
  const [renameSectionVisible, setRenameSectionVisible] = useState(false);

  function getOnOk() {
    return (sectionName: string) => {
      props.onEditOk(sectionName);
      setRenameSectionVisible(false);
    };
  }

  return (
    <>
      <div
        style={{
          borderBottom: visible ? "" : "1px solid #3e90cc",
          marginBottom: visible ? "" : 20,
        }}
      >
        <Row gutter={16} align={"top"}>
          <Col xs={12} style={{ textAlign: "left" }}>
            <h2>{props.title}</h2>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <Space size={"middle"}>
              <div
                onClick={() => {
                  setRenameSectionVisible(true);
                }}
              >
                <EditIcon />
              </div>

              <Popconfirm
                title="Are you sure to delete this section?"
                onConfirm={() => {
                  props.onDelete && props.onDelete();
                }}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <a href="">
                  <DeleteIcon />
                </a>
              </Popconfirm>

              <div
                onClick={() => {
                  setVisible((visible) => !visible);
                }}
              >
                {(() => {
                  if (visible) return <CloseArrow />;
                  else return <OpenArrow />;
                })()}
              </div>
            </Space>
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: visible ? "" : "none",
        }}
      >
        {props.children}
      </div>
      <RenameSectionModel
        visible={renameSectionVisible}
        sectionName={props.sectionName}
        onOk={getOnOk()}
        onCancel={() => {
          setRenameSectionVisible(false);
        }}
      />
    </>
  );
};

export default EditorWrapper;
