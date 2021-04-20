import React, { useState } from "react";
import { useParams } from "umi";
import {
  Skeleton,
  Row,
  Col,
  Form,
  Select,
  Radio,
  Button,
  message,
  Input,
  DatePicker,
} from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
import { useScreenWidthWithin } from "@/utils/hooks";
import ContestAdminLayout from "./components/ContestAdminLayout";
import { useEffect } from "react";
import moment from "moment";

import api from "@/api";

interface DashboardPageParams {
  id: string;
}

const DashboardPage: React.FC<{}> = (props) => {
  const [form] = Form.useForm();
  const params: DashboardPageParams = useParams();
  const isMobile = useScreenWidthWithin(0, 768);

  const [contestFrozenStatus, setContestFrozenStatus] = useState(true);

  const [contestMeta, setContestMeta] = useState(
    null as ApiTypes.ContestMetaDto,
  );
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getContest({
      id: parseInt(params.id),
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      setContestMeta(response.contestMeta);
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [updateLoading, setUpdateLoading] = useState(false);
  async function onFinish(e: any) {
    setUpdateLoading(true);

    let frozenDuringTime = {};
    if (contestFrozenStatus) {
      frozenDuringTime = {
        frozenStartTime: e.contestFrozenDuringTime[0].toDate(),
        frozenEndTime: e.contestFrozenDuringTime[1].toDate(),
      };
    }

    const { requestError, response } = await api.contest.editContest({
      contestId: parseInt(params.id),
      contestName: e.contestName,
      startTime: e.contestDuringTime[0].toDate(),
      endTime: e.contestDuringTime[1].toDate(),
      isPublic: e.contestStatus,
      ...frozenDuringTime,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success("Update Successfully!");
      setUpdateLoading(false);
    }
  }

  const RangePickerConfig = [
    {
      type: "obj" as const,
    },
  ];

  return (
    <ContestAdminLayout current="dashboard">
      <Skeleton
        loading={fetchDataLoading}
        active
        title={true}
        paragraph={{ rows: 4 }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              initialValues={{
                contestName: contestMeta?.contestName,
                contestStatus: contestMeta?.isPublic,
                contestDuringTime: [
                  moment(new Date(contestMeta?.startTime)),
                  moment(new Date(contestMeta?.endTime)),
                ],
                contestFrozenDuringTime: [
                  moment(new Date(contestMeta?.frozenStartTime)),
                  moment(new Date(contestMeta?.frozenEndTime)),
                ],
              }}
            >
              <Form.Item
                name="contestName"
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div style={{ marginTop: -20 }}>
                <Form.Item name="contestStatus" label="">
                  <Radio.Group>
                    <Radio value={true}>Public</Radio>
                    <Radio value={false}>Private</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div style={{ marginTop: -10 }}>
                <Form.Item
                  name="contestDuringTime"
                  label="During Time"
                  {...RangePickerConfig}
                >
                  <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>

              <Form.Item name="contestFrozenStatus" label="Frozen">
                <div style={{ marginTop: -15 }}>
                  <Radio.Group
                    onChange={(e) => {
                      setContestFrozenStatus(e.target.value);
                    }}
                    value={contestFrozenStatus}
                  >
                    <Radio value={true}>Frozen</Radio>
                    <Radio value={false}>Unfrozen</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>

              {contestFrozenStatus && (
                <div style={{ marginTop: -25 }}>
                  <Form.Item
                    name="contestFrozenDuringTime"
                    label=""
                    {...RangePickerConfig}
                  >
                    <RangePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              )}

              <Form.Item>
                <Button
                  style={{
                    width: isMobile ? "100%" : "",
                    marginTop: -10,
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

          {/* <Col xs={24} sm={24} md={24} lg={7} xl={7}></Col> */}
        </Row>
      </Skeleton>
    </ContestAdminLayout>
  );
};

export default DashboardPage;
