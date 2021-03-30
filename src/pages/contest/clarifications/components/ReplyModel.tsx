import React, { useState } from "react";
import { Modal } from "antd";

import LazyMarkDownEditor from "@/components/Editor/LazyMarkDownEditor";

import api from "@/api";

interface ReplyModel {
  visible: boolean;
  confirmLoading?: any;
  title?: string;
  user?: string;
  onOk?: any;
  onCancel?: any;
}

const ReplyModel: React.FC<ReplyModel> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  async function onReply() {
    setConfirmLoading(true);

    // if (response?.error) {
    //   message.error(response.error);
    // } else {
    //   message.success{`Reply to ${props.user} Sucessfully!`);
    //   if (props.onCancel) {
    //     props.onCancel();
    //   }
    // }

    setConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={`Reply to ${props.user ?? ""}`}
        okText={"Reply"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={props.confirmLoading || confirmLoading}
        onCancel={props.onCancel ?? (() => {})}
        onOk={() => {
          onReply();
          props.onOk && props.onOk();
        }}
        bodyStyle={{
          padding: "10px 10px",
        }}
        width={780}
      >
        <div style={{ marginBottom: -12 }}>
          <LazyMarkDownEditor
            height={"220"}
            // height={isMobile ? "220" : "220"}
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
