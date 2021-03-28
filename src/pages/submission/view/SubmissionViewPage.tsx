import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import BasicLayout from "@/layouts/BasicLayout";
import Loading from "@/components/Loading";
import { Collapse, Tooltip, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import AnsiUp from "ansi_up";
import style from "./SubmissionViewPage.module.less";
import CodeBoxStyle from "@/components/CodeBox.module.less";

import { useScreenWidthWithin } from "@/utils/hooks";
import { CodeBox } from "@/components/CodeBox";
import { ExampleDiffBox } from "@/components/ExampleBox";

import SubmissionsTable from "../components/SubmissionsTable";

import api from "@/api";

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

  const converter = new AnsiUp();

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
            <SubmissionsTable
              query={{
                minId: parseInt(params.id),
                maxId: parseInt(params.id),
              }}
            />

            <div style={{ marginTop: 20 }}>
              <CodeBox language={codeLanguage} code={code} />
            </div>

            {compileInfo.success === false && (
              <>
                <p>
                  <strong>Compilation Message</strong>
                  {/* <Tooltip title="6194541 bytes omitted">
                    <InfoCircleOutlined
                      style={{ marginLeft: "5px", fontSize: "14px" }}
                    />
                  </Tooltip> */}
                </p>
                {/* <div dangerouslySetInnerHTML={{__html: converter.ansi_to_html(compileInfo.message)}}>
                </div> */}
                <CodeBox
                  language={"dangerouslySetInnerHTML"}
                  code={converter.ansi_to_html(compileInfo.message)}
                />
              </>
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
