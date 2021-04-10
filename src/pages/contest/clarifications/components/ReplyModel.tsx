import React, { useState } from "react";
import { Modal, message } from "antd";
import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";

import api from "@/api";

interface ReplyModel {
  visible: boolean;
  username?: string;
  onOk?: (replyContent: string) => never;
  onCancel?: any;
}

const ReplyModel: React.FC<ReplyModel> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  async function onOk() {
    setConfirmLoading(true);

    if (props.onOk) props.onOk(replyContent);
    message.success(`Reply to ${props.username} Sucessfully!`);
    if (props.onCancel) props.onCancel();

    setConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={`Reply to ${props.username ?? ""}`}
        okText={"Reply"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={confirmLoading}
        onCancel={props.onCancel ?? (() => {})}
        onOk={onOk}
        bodyStyle={{
          padding: "10px 10px",
        }}
        width={780}
      >
        <div style={{ marginBottom: -12 }}>
          <LazyMarkDownEditor
            height={"220"}
            language={"markdown"}
            value={replyContent}
            onChange={(value) => setReplyContent(value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ReplyModel;
export { ReplyModel };
