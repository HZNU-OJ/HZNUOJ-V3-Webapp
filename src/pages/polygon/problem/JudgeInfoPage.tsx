import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import ProblemLayout from "./components/ProblemLayout";

import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  message,
  Skeleton,
  Radio,
  Space,
} from "antd";
const { Option } = Select;

import { useScreenWidthWithin } from "@/utils/hooks";
import ProblemInfoPanel from "./components/ProblemInfoPanel";

import FormStyle from "@/less/Form.module.less";

import api from "@/api";
import {
  problemTypeEnum,
  problemStatusEnum,
} from "@/interface/problem.interface";

interface JudgeInfoProps {
  timeLimit?: number;
  memoryLimit?: number;
  runSamples?: true;
  checker?: any;
  interactor?: any;
}
interface CheckerFormProps {
  judgeInfo: JudgeInfoProps;
  setJudgeInfo: any;
}

const CheckerIntegersForm: React.FC<CheckerFormProps> = (props) => {
  useEffect(() => {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        checker: {
          type: "integers",
        },
      });
    });
  }, []);
  return <></>;
};

const CheckerFloatsForm: React.FC<CheckerFormProps> = (props) => {
  const [precision, setPrecision] = useState(
    props.judgeInfo.checker?.precision ?? 4,
  );

  async function setCheckerType(precision: number) {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        checker: {
          type: "floats",
          precision: precision,
        },
      });
    });
  }

  useEffect(() => {
    if (precision === 4) setCheckerType(precision);
  }, []);

  return (
    <>
      <div>
        <h3>Precision</h3>
        <Input
          value={precision}
          onChange={(e) => {
            const p = parseInt(e.target.value);
            setPrecision(p);
            setCheckerType(p);
          }}
        />

        <div
          style={{
            marginTop: 0,
          }}
          className={FormStyle["form-item-footer"]}
        >
          <span>
            {`The participant's answer is considered correct if its absolute or relative error to the jury's answer is less than 1e-${precision}.`}
          </span>
        </div>
      </div>
    </>
  );
};

const CheckerLinesForm: React.FC<CheckerFormProps> = (props) => {
  useEffect(() => {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        checker: {
          type: "lines",
          caseSensitive: true,
        },
      });
    });
  }, []);
  return <></>;
};

const CheckerBinaryForm: React.FC<CheckerFormProps> = (props) => {
  useEffect(() => {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        checker: {
          type: "binary",
        },
      });
    });
  }, []);
  return <></>;
};

interface CheckerCustomFormProps extends CheckerFormProps {
  testData: ApiTypes.ProblemFileDto[];
}

const CheckerCustomForm: React.FC<CheckerCustomFormProps> = (props) => {
  const [filename, setFilename] = useState(
    props.judgeInfo.checker?.filename ?? "",
  );

  async function setCheckerType(filename: string) {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        checker: {
          type: "custom",
          interface: "testlib",
          language: "cpp",
          compileAndRunOptions: {
            compiler: "g++",
            std: "c++17",
            O: "2",
            m: "64",
          },
          filename: filename,
        },
      });
    });
  }

  useEffect(() => {
    if (filename === "") setCheckerType(filename);
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h3>Filename</h3>
        <Select
          style={{ width: "100%" }}
          value={filename}
          onChange={(e) => {
            setFilename(e.toString());
            setCheckerType(e.toString());
          }}
        >
          {props.testData.map((file) => {
            return (
              <Option key={file.filename} value={file.filename}>
                {file.filename}
              </Option>
            );
          })}
        </Select>
        <div
          style={{
            marginTop: 0,
          }}
          className={FormStyle["form-item-footer"]}
        >
          <span>{`Select a file representing custom checker.`}</span>
        </div>
      </div>
    </>
  );
};

interface CheckerFormAdapterProps extends CheckerFormProps {
  checkerType: string;
  testData: ApiTypes.ProblemFileDto[];
}

const CheckerFormAdapter: React.FC<CheckerFormAdapterProps> = (props) => {
  return (
    <>
      {props.checkerType === "integers" && (
        <CheckerIntegersForm
          judgeInfo={props.judgeInfo}
          setJudgeInfo={props.setJudgeInfo}
        />
      )}

      {props.checkerType === "floats" && (
        <CheckerFloatsForm
          judgeInfo={props.judgeInfo}
          setJudgeInfo={props.setJudgeInfo}
        />
      )}

      {props.checkerType === "lines" && (
        <CheckerLinesForm
          judgeInfo={props.judgeInfo}
          setJudgeInfo={props.setJudgeInfo}
        />
      )}

      {props.checkerType === "binary" && (
        <CheckerBinaryForm
          judgeInfo={props.judgeInfo}
          setJudgeInfo={props.setJudgeInfo}
        />
      )}

      {props.checkerType === "custom" && (
        <CheckerCustomForm
          judgeInfo={props.judgeInfo}
          setJudgeInfo={props.setJudgeInfo}
          testData={props.testData}
        />
      )}
    </>
  );
};
interface InteractorFormProps extends CheckerFormProps {
  testData: ApiTypes.ProblemFileDto[];
}

const InteractorForm: React.FC<InteractorFormProps> = (props) => {
  const [filename, setFilename] = useState(
    props.judgeInfo.interactor?.filename ?? "",
  );

  async function setInteractorType(filename: string) {
    props.setJudgeInfo((judgeInfo: JudgeInfoProps) => {
      return Object.assign({}, judgeInfo, {
        interactor: {
          interface: "stdio",
          language: "cpp",
          compileAndRunOptions: {
            compiler: "g++",
            std: "c++17",
            O: "2",
            m: "64",
          },
          filename: filename,
        },
      });
    });
  }

  useEffect(() => {
    if (filename === "") setInteractorType(filename);
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h3>Interactor</h3>
        <Select
          style={{ width: "100%" }}
          value={filename}
          onChange={(e) => {
            setFilename(e.toString());
            setInteractorType(e.toString());
          }}
        >
          {props.testData.map((file) => {
            return (
              <Option key={file.filename} value={file.filename}>
                {file.filename}
              </Option>
            );
          })}
        </Select>
        <div
          style={{
            marginTop: 0,
          }}
          className={FormStyle["form-item-footer"]}
        >
          <span>{`Select a file representing custom interactor.`}</span>
        </div>
      </div>
    </>
  );
};

interface JudgeInfoParams {
  id: string;
}

const JudgeInfoPage: React.FC<{}> = (props) => {
  const params: JudgeInfoParams = useParams();
  const [form] = Form.useForm();
  const isMobile = useScreenWidthWithin(0, 768);

  const [problemId, setProblemId] = useState(parseInt(params.id));
  const [problemType, setProblemType] = useState(
    "Traditional" as problemTypeEnum,
  );
  const [problemName, setProblemName] = useState("");
  const [problemStatus, setProblemStatus] = useState(
    "Private" as problemStatusEnum,
  );
  const [problemOwner, setProblemOwner] = useState("");
  const [judgeInfo, setJudgeInfo] = useState({} as JudgeInfoProps);
  const [submittable, setSubmittable] = useState(false);
  const [testData, setTestData] = useState([] as ApiTypes.ProblemFileDto[]);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);

  const [checkerType, setCheckerType] = useState("integers");

  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: parseInt(params.id),
      owner: true,
      localizedContentsOfLocale: "en_US",
      localizedContentsTitleOnly: true,
      judgeInfo: true,
      testData: true,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setProblemType(response.meta.type);
      setProblemName(response.localizedContentsOfLocale.title);
      setProblemStatus(response.meta.isPublic ? "Public" : "Private");
      setProblemOwner(response.owner.username);
      setSubmittable(response.submittable);
      setJudgeInfo(response.judgeInfo);
      setTestData(response.testData);
      if (response.meta.type === "Traditional") {
        setCheckerType(response.judgeInfo.checker?.type);
      }
      setFetchDataLoading(false);
    }
  }

  const [updateLoading, setUpdateLoading] = useState(false);
  async function onUpdate() {
    setUpdateLoading(true);

    const { requestError, response } = await api.problem.updateProblemJudgeInfo(
      {
        problemId,
        judgeInfo,
        submittable,
      },
    );

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success("Update Problem JudgeInfo Sucessfully!");
    }

    setUpdateLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [updateLoading]);

  return (
    <ProblemLayout current={"judge-info"}>
      <Skeleton
        loading={fetchDataLoading}
        active
        title={true}
        paragraph={{ rows: 4 }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={17} xl={17}>
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              initialValues={{
                submittable,
                timeLimit: judgeInfo?.timeLimit,
                memoryLimit: judgeInfo?.memoryLimit,
                runSamples: judgeInfo?.runSamples,
                checker: judgeInfo?.checker?.type ?? "lines",
              }}
            >
              <Space size={"middle"}>
                <div style={{ marginBottom: -10 }}>
                  <Form.Item name="submittable" label="Submittable">
                    <Radio.Group
                      onChange={(e) => {
                        setSubmittable(e.target.value);
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <div style={{ marginBottom: -10 }}>
                  <Form.Item name="runSamples" label="Run Samples">
                    <Radio.Group
                      onChange={(e) => {
                        setJudgeInfo((judgeInfo) => {
                          return Object.assign({}, judgeInfo, {
                            runSamples: e.target.value,
                          });
                        });
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Space>

              <Form.Item>
                <Form.Item name="timeLimit" label="Time Limit">
                  <Input
                    addonAfter="ms"
                    onChange={(e) => {
                      setJudgeInfo((judgeInfo) => {
                        return Object.assign({}, judgeInfo, {
                          timeLimit: parseInt(e.target.value),
                        });
                      });
                    }}
                  />
                </Form.Item>

                <div className={FormStyle["form-item-footer"]}>
                  <span>
                    Time limit per test (between 250 ms and 15000 ms).
                  </span>
                </div>
              </Form.Item>

              <Form.Item>
                <Form.Item name="memoryLimit" label="Memory Limit">
                  <Input
                    addonAfter="MiB"
                    onChange={(e) => {
                      setJudgeInfo((judgeInfo) => {
                        return Object.assign({}, judgeInfo, {
                          memoryLimit: parseInt(e.target.value),
                        });
                      });
                    }}
                  />
                </Form.Item>

                <div className={FormStyle["form-item-footer"]}>
                  <span>Memory limit (between 4 MB and 1024 MB).</span>
                </div>
              </Form.Item>

              {problemType === "Traditional" && (
                <>
                  <Form.Item name="checker" label="Checker">
                    <Select
                      onChange={(e) => {
                        setCheckerType(e.toString());
                      }}
                    >
                      <Option value="integers">Integers</Option>
                      <Option value="floats">Floats</Option>
                      <Option value="lines">Lines</Option>
                      <Option value="binary">Binary</Option>
                      <Option value="custom">Custom</Option>
                    </Select>
                  </Form.Item>

                  <CheckerFormAdapter
                    judgeInfo={judgeInfo}
                    setJudgeInfo={setJudgeInfo}
                    checkerType={checkerType}
                    testData={testData}
                  />
                </>
              )}

              {problemType === "Interaction" && (
                <InteractorForm
                  judgeInfo={judgeInfo}
                  setJudgeInfo={setJudgeInfo}
                  testData={testData}
                />
              )}
            </Form>
          </Col>

          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <ProblemInfoPanel
              id={problemId.toString()}
              name={problemName}
              type={problemType}
              status={problemStatus}
              owner={problemOwner}
            />
            <Button
              style={{
                width: "100%",
                marginTop: 10,
              }}
              type="primary"
              loading={updateLoading}
              onClick={onUpdate}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Skeleton>
    </ProblemLayout>
  );
};

export default JudgeInfoPage;
