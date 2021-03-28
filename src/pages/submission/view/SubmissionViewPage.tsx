import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import BasicLayout from "@/layouts/BasicLayout";
import Loading from "@/components/Loading";
import { Collapse, Tooltip, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

import style from "./SubmissionViewPage.module.less";
import CodeBoxStyle from "@/components/CodeBox.module.less";

import { useScreenWidthWithin } from "@/utils/hooks";
import { CodeBox } from "@/components/CodeBox";
import { ExampleDiffBox } from "@/components/ExampleBox";

import api from "@/api";

const code = `#include <bits/stdc++.h>

int main() {

  string a = "https://www.baidu.com";  string a = "https://www.baidu.com";  string a = "https://www.baidu.com";  string a = "https://www.baidu.com";  string a = "https://www.baidu.com";  string a = "https://www.baidu.com";
  return 0;
}`;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CompilationMessage = `/sandbox/source/Main.cs(1,2): error CS1024: Preprocessor directive expected
/sandbox/source/Main.cs(2,7): error CS1041: Identifier expected; 'namespace' is a keyword
/sandbox/source/Main.cs(2,20): error CS1514: { expected
/sandbox/source/Main.cs(3,2): error CS1024: Preprocessor directive expected
/sandbox/source/Main.cs(4,2): error CS1024: Preprocessor directive expected
/sandbox/source/Main.cs(6,2): error CS1032: Cannot define/undefine preprocessor symbols after first token in file
/sandbox/source/Main.cs(6,14): error CS1025: Single-line comment or end-of-line expected
/sandbox/source/Main.cs(10,27): error CS1018: Keyword 'this' or 'base' expected
/sandbox/source/Main.cs(10,27): error CS1002: ; expected
/sandbox/source/Main.cs(10,31): error CS1001: Identifier expected
/sandbox/source/Main.cs(10,32): error CS1002: ; expected
/sandbox/source/Main.cs(10,32): error CS1519: Invalid token ',' in class, struct, or interface member declaration
/sandbox/source/Main.cs(10,38): error CS1001: Identifier expected
/sandbox/source/Main.cs(12,15): error CS0650: Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.
/sandbox/source/Main.cs(12,16): error CS0270: Array size cannot be specified in a variable declaration (try initializing with a 'new' expression)
/sandbox/source/Main.cs(13,9): error CS0650: Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.
/sandbox/source/Main.cs(13,10): error CS0270: Array size cannot be specified in a variable declaration (try initializing with a 'new' expression)
/sandbox/source/Main.cs(14,10): error CS0650: Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.
/sandbox/source/Main.cs(14,11): error CS0270: Array size cannot be specified in a variable declaration (try initializing with a 'new' expression)
/sandbox/source/Main.cs(15,10): error CS0650: Bad array declarator: To declare a managed array the rank specifier precedes the variable's identifier. To declare a fixed size buffer field, use the fixed keyword before the field type.
/sandbox/source/Main.cs(15,11): error CS0270: Array size cannot be specified in a variable declaration (try initializing with a 'new' expression)
/sandbox/source/Main.cs(76,2): error CS1513: } expected
`;

interface SubmissionViewPageParams {
  id: string;
}

const input = `3
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thisisaexample
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
AertrtsaBereDET
8.19 1.47 3.83 3.91 12.25 2.26 1.71 4.57 7.10 0.14 0.41 3.77 3.34 7.06 7.26 2.89 0.09 6.85 6.36 9.41 2.58 1.09 1.59 0.21 1.58 0.08
Thequickbrownfoxjumpsoverthelazydog`;

const output = `case #0:
eeTaaiisshlmpx
case #1:
eeeEttTaArrrsDB
case #2:
eeetTaooooinrrshhdclmpuufgwybvkxjqz`;

interface CompileInfo {
  message: string;
  success: boolean;
}

const SubmissionViewPage: React.FC<{}> = (props) => {
  const params: SubmissionViewPageParams = useParams();
  const isMobile = useScreenWidthWithin(0, 992);

  const [codeLanguage, setCodeLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [compileInfo, setCompileInfo] = useState({
    message: "",
    success: true,
  } as CompileInfo);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.submission.getSubmissionDetail(
      {
        submissionId: params.id,
        locale: "en_US",
      },
    );

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      console.log(response);
      setCodeLanguage(response.meta.codeLanguage);
      setCode(response.content?.code);
      setCompileInfo(response.progress?.compile);
    }

    setFetchDataLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BasicLayout current={"submissions"}>
      <div className={style.root}>
        {fetchDataLoading && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {fetchDataLoading === false && (
          <>
            <CodeBox language={codeLanguage} code={code} />
            <p>
              <strong>Compilation Message</strong>
              <Tooltip title="6194541 bytes omitted">
                <InfoCircleOutlined
                  style={{ marginLeft: "5px", fontSize: "14px" }}
                />
              </Tooltip>
            </p>

            {compileInfo.success === false && (
              <CodeBox language={"plaintext"} code={compileInfo.message} />
            )}

            {/* <p>
              <strong>Test Details</strong>
            </p>
            <div
              className={`${CodeBoxStyle.codeBoxSegment} ${CodeBoxStyle.codeBoxPre}`}
            >
              <Collapse defaultActiveKey={[]} ghost>
                <Panel header="Test #1" key="1">
                  <ExampleDiffBox
                    input={input}
                    output={output}
                    yourOutput={output}
                    checkerMessage={output}
                  />
                </Panel>
                <Panel header="Test #2" key="2">
                  <ExampleDiffBox
                    input={input}
                    output={output}
                    yourOutput={output}
                    checkerMessage={output}
                  />
                </Panel>
                <Panel header="Test #3" key="3">
                  <ExampleDiffBox
                    input={input}
                    output={output}
                    yourOutput={output}
                    checkerMessage={output}
                  />
                </Panel>
              </Collapse>
            </div> */}
          </>
        )}
      </div>
    </BasicLayout>
  );
};

export default SubmissionViewPage;
