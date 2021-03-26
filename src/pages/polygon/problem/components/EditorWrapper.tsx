import React, { useState } from "react";
import { Row, Col, Space, message } from "antd";
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

interface EditorWrapperProps {
  title: string;
}

const EditorWrapper: React.FC<EditorWrapperProps> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        style={{
          borderBottom: visible ? "" : "1px solid #3e90cc",
          marginBottom: visible ? "" : 20,
        }}
      >
        <Row gutter={16} align={"top"}>
          <Col md={12} style={{ textAlign: "left" }}>
            <h2>{props.title}</h2>
          </Col>
          <Col md={12} style={{ textAlign: "right" }}>
            <Space size={"middle"}>
              <div
                onClick={() => {
                  message.info("Coming Soon!");
                }}
              >
                <EditIcon />
              </div>
              <div
                onClick={() => {
                  message.info("Coming Soon!");
                }}
              >
                <DeleteIcon />
              </div>
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
    </>
  );
};

export default EditorWrapper;
