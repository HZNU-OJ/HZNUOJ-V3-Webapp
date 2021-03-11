import React from "react";
import CodeEditor from "./CodeEditor";
import style from "./Editor.common.module.less";

import { Button, Row, Col, Tabs } from "antd";
const { TabPane } = Tabs;

import { useScreenWidthWithin } from "@/utils/hooks";

import type { CodeEditorProps } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

export interface MarkDownEditorProps extends CodeEditorProps {
  loading?: boolean;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);

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
                  options={isMobile ? editorOptions : {}}
                  {...props}
                />
              </TabPane>
              <TabPane tab="Preview" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Upload" key="3">
                Content of Tab Pane 3
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
