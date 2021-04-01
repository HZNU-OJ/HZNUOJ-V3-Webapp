import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import BasicLayout from "@/layouts/BasicLayout";
import Loading from "@/components/Loading";
import { Collapse, message, Row, Col } from "antd";
const { Panel } = Collapse;
import AnsiUp from "ansi_up";
import style from "./SubmissionViewPage.module.less";
import CodeBoxStyle from "@/components/CodeBox.module.less";

import { useScreenWidthWithin } from "@/utils/hooks";
import { CodeBox } from "@/components/CodeBox";
import { ExampleDiffBox } from "@/components/ExampleBox";

import SubmissionsTable from "../components/SubmissionsTable";

import { RightOutlined, DownOutlined } from "@ant-design/icons";

const CloseArrow = () => (
  <DownOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

const OpenArrow = () => (
  <RightOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

import api from "@/api";

interface SubmissionViewPageParams {
  id: string;
}

const ContentWrapper: React.FC<{
  title: string;
  defaultVisible?: boolean;
}> = (props) => {
  const [visible, setVisible] = useState(props.defaultVisible ?? true);

  return (
    <>
      <div
        style={{
          borderBottom: visible ? "" : "1px solid #3e90cc",
          marginBottom: visible ? "" : 20,
        }}
      >
        <Row
          onClick={() => {
            setVisible((visible) => !visible);
          }}
          style={{ cursor: "pointer" }}
        >
          <Col xs={12} style={{ textAlign: "left" }}>
            <h2>{props.title}</h2>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            {(() => {
              if (visible) return <CloseArrow />;
              else return <OpenArrow />;
            })()}
          </Col>
        </Row>
        <div style={{ display: visible ? "" : "none" }}>{props.children}</div>
      </div>
    </>
  );
};

function TestCaseResultRender(
  id: number,
  result: string,
  timeUsed: number,
  memoryUsed: number,
) {
  return (
    <span>{`Testcase ${id} ${result} ${timeUsed.toFixed(
      0,
    )} ${memoryUsed}`}</span>
  );
}

interface CompileInfo {
  message: string;
  success: boolean;
}

const SubmissionViewPage: React.FC<{}> = (props) => {
  const params: SubmissionViewPageParams = useParams();
  const isMobile = useScreenWidthWithin(0, 992);

  const converter = new AnsiUp();

  const [meta, setMeta] = useState(null as ApiTypes.SubmissionMetaDto);
  const [code, setCode] = useState("");
  const [compileInfo, setCompileInfo] = useState({
    message: "",
    success: true,
  } as CompileInfo);
  const [testcaseResult, setTestcaseResult] = useState([]);
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
      setMeta(response.meta);
      setCode(response.content?.code);
      setCompileInfo(response.progress?.compile);
      if (response.progress?.testcaseResult) {
        const testcaseResult = response.progress.testcaseResult;
        let _testcaseResult = [];
        Object.keys(testcaseResult).forEach((key) => {
          _testcaseResult.push(testcaseResult[key]);
        });
        _testcaseResult.sort((a, b) => {
          const _a = a.testcaseInfo.inputFile;
          const _b = b.testcaseInfo.inputFile;
          if (_a < _b) return -1;
          return 1;
        });
        setTestcaseResult(_testcaseResult);
      }
      setFetchDataLoading(false);
    }
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
                takeCount: 1,
              }}
            />

            {compileInfo?.message.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <ContentWrapper title={"Compilation Message"}>
                  <CodeBox
                    language={"dangerouslySetInnerHTML"}
                    code={converter.ansi_to_html(compileInfo.message)}
                  />
                </ContentWrapper>
              </div>
            )}

            <div style={{ marginTop: 20 }}>
              <ContentWrapper title={"Code"}>
                <CodeBox language={meta.codeLanguage} code={code} />
              </ContentWrapper>
            </div>

            {testcaseResult.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <ContentWrapper title={"Test Details"}>
                  <div
                    className={`${CodeBoxStyle.codeBoxSegment} ${CodeBoxStyle.codeBoxPre}`}
                  >
                    <Collapse defaultActiveKey={[]} ghost>
                      <>
                        {testcaseResult.map((result, index) => (
                          <Panel
                            header={TestCaseResultRender(
                              index + 1,
                              result.status,
                              result.time,
                              result.memory,
                            )}
                            key={index + 1}
                          >
                            <ExampleDiffBox
                              meta={meta}
                              testcaseResult={result}
                            />
                          </Panel>
                        ))}
                      </>
                    </Collapse>
                  </div>
                </ContentWrapper>
              </div>
            )}
          </>
        )}
      </div>
    </BasicLayout>
  );
};

export default SubmissionViewPage;
