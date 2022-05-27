import React from "react";

import { Upload, message } from "antd";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";

const UploadDragger: React.FC<{}> = (props) => {
  const fileList = [
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "yyy.png",
      status: "error",
    },
  ];

  const _props = {
    name: "file",
    multiple: true,
    // listType: "picture",
    // defaultFileList: [...fileList],
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // previewFile(url: string) {
    //   alert(url);
    // },
    // showUploadList: false,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // onDownload(url: string) {
    //   alert(url);
    // },
  };

  return (
    <div
      style={{
        minHeight: "220px",
        height: "50%",
      }}
    >
      <Dragger {..._props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
};

export default UploadDragger;
