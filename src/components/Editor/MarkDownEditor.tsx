import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import style from "./Editor.common.module.less";
import * as Monaco from "monaco-editor";
import UploadDragger from "@/components/UploadDragger";

import { Button, Tabs } from "antd";

const { TabPane } = Tabs;

import { useScreenWidthWithin } from "@/utils/hooks";

import type { CodeEditorProps } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

import LazyMarkdownContent from "@/markdown/LazyMarkdownContent";

export interface MarkDownEditorProps extends CodeEditorProps {
  loading?: boolean;
  onSubmit?: any;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);
  const [content, setContent] = useState(props.value);
  const [markdownContentLoading, setMarkdownContentLoading] = useState(true);

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
              {...(!props.onSubmit || isMobile
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
              onChange={(activeKey: string) => {
                setMarkdownContentLoading(activeKey === "1");
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
                  <LazyMarkdownContent
                    content={content}
                    noSanitize={true}
                    loading={markdownContentLoading}
                  />
                </div>
              </TabPane>
              {/* <TabPane tab="Upload" key="3">
                <div
                  className={style.upload}
                  style={{ height: parseInt(props.height) }}
                >
                  <UploadDragger />
                </div>
              </TabPane> */}
            </Tabs>
          </div>

          {props.onSubmit && isMobile && (
            <div className={style["panel-footer"]}>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button
                  type={"primary"}
                  onClick={props.onSubmit ?? (() => {})}
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
