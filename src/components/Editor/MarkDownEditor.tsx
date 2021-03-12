import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import style from "./Editor.common.module.less";
import * as Monaco from "monaco-editor";

import { Button, Row, Col, Tabs, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const { Dragger } = Upload;

import { useScreenWidthWithin } from "@/utils/hooks";

import type { CodeEditorProps } from "./LazyCodeEditor";
import LazyMarkdownContent from "@/markdown/MarkdownContent";
import MarkdownContentStyle from "@/markdown/MarkdownContent";
export type { CodeEditorProps } from "./CodeEditor";

export interface MarkDownEditorProps extends CodeEditorProps {
  loading?: boolean;
}

const UploadComponent: React.FC<{}> = (props) => {
  const fileList = [
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
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
    listType: "picture",
    defaultFileList: [...fileList],
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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

const MarkDownEditor: React.FC<MarkDownEditorProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);
  const [content, setContent] = useState(props.value);

  useEffect(() => {
    setContent(props.value);
  }, [props.value]);

  const submitButton = (
    <Button
      type={"primary"}
      style={{
        width: isMobile ? "100%" : 120,
        marginBottom: isMobile ? "" : "5px",
      }}
    >
      Submit
    </Button>
  );

  const editorOptions = {
    lineNumbers: "off",
    folding: false,
    minimap: { enabled: false },
  };

  return (
    <>
      <div className={style.root}>
        <div className={`am-panel am-panel-primary ${style.panel}`}>
          <div className={style["panel-body"]}>
            <Tabs
              defaultActiveKey="1"
              centered={isMobile ? true : false}
              tabBarGutter={0}
              {...(isMobile
                ? {}
                : {
                    tabBarExtraContent: {
                      right: submitButton,
                    },
                  })}
              type="card"
              style={{
                padding: "0px",
              }}
            >
              <TabPane tab="Edit" key="1">
                <CodeEditor
                  language={"markdown"}
                  height={props.height || "500"}
                  value={props.value}
                  onChange={props.onChange}
                  options={
                    (isMobile
                      ? editorOptions
                      : {}) as Monaco.editor.IEditorConstructionOptions
                  }
                />
              </TabPane>
              <TabPane tab="Preview" key="2">
                <div
                  className={style.preview}
                  style={{ height: parseInt(props.height) }}
                >
                  <LazyMarkdownContent content={content} noSanitize={true} />
                </div>
              </TabPane>
              <TabPane tab="Upload" key="3">
                <div
                  className={style.upload}
                  style={{ height: parseInt(props.height) }}
                >
                  <UploadComponent />
                </div>
              </TabPane>
            </Tabs>
          </div>

          {isMobile && (
            <div className={style["panel-footer"]}>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button
                  type={"primary"}
                  style={{
                    width: isMobile ? "100%" : 120,
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { MarkDownEditor };
export default MarkDownEditor;
