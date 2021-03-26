import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import ProblemLayout from "./components/ProblemLayout";

import { Form, Row, Col, Input, Button, Select, message, Skeleton } from "antd";
const { Option } = Select;

import { useScreenWidthWithin } from "@/utils/hooks";
import ProblemInfoPanel from "./components/ProblemInfoPanel";

import FormStyle from "@/less/Form.module.less";

import api from "@/api";
import {
  problemTypeEnum,
  problemTypeList,
} from "@/interface/problem.interface";

interface DashboardPageParams {
  id: string;
}

interface DashboardFormProps {
  timeLimit: number;
  memoryLimit: number;
}

const JudgeInfoPage: React.FC<{}> = (props) => {
  const params: DashboardPageParams = useParams();

  const [problemId, setProblemId] = useState(params.id);
  const [problemType, setProblemType] = useState(
    "Traditional" as problemTypeEnum,
  );
  const [problemName, setProblemName] = useState("");
  const [problemOwner, setProblemOwner] = useState("");

  const [form] = Form.useForm();
  const isMobile = useScreenWidthWithin(0, 768);

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.problem.getProblem({
      id: parseInt(params.id),
      owner: true,
      localizedContentsOfLocale: "en_US",
      localizedContentsTitleOnly: true,
    });

    if (requestError) message.error(requestError);
    else {
      setProblemType(response.meta.type);
      setProblemName(response.localizedContentsOfLocale.title);
      setProblemOwner(response.owner.username);
    }

    setFetchDataLoading(false);
  }

  const [updateLoading, setUpdateLoading] = useState(false);
  async function onFinish(formProps: DashboardFormProps) {
    setUpdateLoading(true);
    // const { requestError, response } = await api.problem.changeProblemType({
    //   problemId: parseInt(problemId),
    //   type: formProps.problemType,
    // });

    // if (requestError) message.error(requestError);
    // else if (response.error) message.error(response.error);
    // else {
    //   message.success("Update Problem Type Sucessfully!");
    // }
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
              onFinish={onFinish}
              initialValues={{
                problemType: problemType,
              }}
            >
              <Form.Item>
                <Form.Item name="timeLimit" label="Time Limit">
                  <Input addonAfter="ms" />
                </Form.Item>

                <div className={FormStyle["form-item-footer"]}>
                  <span>
                    Time limit per test (between 250 ms and 15000 ms).
                  </span>
                </div>
              </Form.Item>

              <Form.Item>
                <Form.Item name="memoryLimit" label="Memory Limit">
                  <Input addonAfter="MiB" />
                </Form.Item>

                <div className={FormStyle["form-item-footer"]}>
                  <span>Memory limit (between 4 MB and 1024 MB).</span>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    width: isMobile ? "100%" : "",
                    marginTop: -20,
                  }}
                  type="primary"
                  htmlType="submit"
                  loading={updateLoading}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <ProblemInfoPanel
              id={problemId}
              name={problemName}
              type={problemType}
              owner={problemOwner}
            />
          </Col>
        </Row>
      </Skeleton>
    </ProblemLayout>
  );
};

export default JudgeInfoPage;
