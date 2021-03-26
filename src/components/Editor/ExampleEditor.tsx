import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import style from "./Editor.common.module.less";
import * as Monaco from "monaco-editor";

import { Button, Tabs } from "antd";

const { TabPane } = Tabs;

import { useScreenWidthWithin } from "@/utils/hooks";

import type { CodeEditorProps } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

export interface ExampleEditorProps extends CodeEditorProps {
  loading?: boolean;
  input?: string;
  onInputChange?: (newValue: string) => void;
  output?: string;
  onOutputChange?: (newValue: string) => void;
}

const ExampleEditor: React.FC<ExampleEditorProps> = (props) => {
  const isMobile = useScreenWidthWithin(0, 577);

  useEffect(() => {}, [props.input, props.output]);

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
              type="card"
              style={{
                padding: "0px",
              }}
            >
              <TabPane tab="Input" key="1">
                <CodeEditor
                  language={"plain"}
                  height={props.height || "500"}
                  value={props.input}
                  onChange={props.onInputChange}
                  options={
                    (isMobile
                      ? editorOptions
                      : {}) as Monaco.editor.IEditorConstructionOptions
                  }
                />
              </TabPane>
              <TabPane tab="Output" key="2">
                <CodeEditor
                  language={"plain"}
                  height={props.height || "500"}
                  value={props.output}
                  onChange={props.onOutputChange}
                  options={
                    (isMobile
                      ? editorOptions
                      : {}) as Monaco.editor.IEditorConstructionOptions
                  }
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export { ExampleEditor };
export default ExampleEditor;
