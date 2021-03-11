import React from "react";
import CodeEditor from "./CodeEditor";
import style from "./Editor.common.module.less";

import { Button, Select, Row, Col } from "antd";

import { useScreenWidthWithin } from "@/utils/hooks";

const { Option } = Select;

import type { CodeEditorProps } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

export interface CodeBoxEditorProps extends CodeEditorProps {
  loading?: boolean;
}

const CodeBoxEditor: React.FC<CodeBoxEditorProps> = (props) => {
  const editorOptions = {
    lineNumbers: "off",
    folding: false,
    minimap: { enabled: false },
  };

  const isMobile = useScreenWidthWithin(0, 577);

  const submitButton = (
    <Button
      type={"primary"}
      style={{
        width: isMobile ? "100%" : 120,
      }}
    >
      Submit
    </Button>
  );

  return (
    <>
      <div className={style.root}>
        <div className={`am-panel am-panel-primary ${style.panel}`}>
          <div className={style["panel-header"]}>
            <Row gutter={16} align="top">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 16 }}
                md={{ span: 16 }}
                lg={{ span: 20 }}
                xl={{ span: 20 }}
              >
                <div
                  style={{
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  <Select
                    defaultValue="cpp"
                    style={{
                      width: isMobile ? "100%" : 220,
                    }}
                  >
                    <Option value="c">C</Option>
                    <Option value="cpp">C++</Option>
                    <Option value="java">Java</Option>
                    <Option value="python">Python</Option>
                  </Select>
                </div>
              </Col>

              {isMobile === false && (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 8 }}
                  md={{ span: 8 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <div
                    style={{
                      textAlign: isMobile ? "center" : "right",
                      paddingTop: isMobile ? "10px" : "",
                    }}
                  >
                    {submitButton}
                  </div>
                </Col>
              )}
            </Row>
          </div>

          <div className={style["panel-body"]}>
            <CodeEditor options={isMobile ? editorOptions : {}} {...props} />
          </div>

          {isMobile === true && (
            <div className={style["panel-footer"]}>{submitButton}</div>
          )}
        </div>
      </div>
    </>
  );
};

export { CodeBoxEditor };
export default CodeBoxEditor;
