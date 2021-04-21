import React, { useState, useEffect } from "react";
import { useParams } from "umi";
import { Row, Col, message } from "antd";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import { DataView, LeftPanel, SubwayGraph, RatingGraph } from "./components";

import { getTimeZone } from "@/utils";
import api from "@/api";
import style from "./UserViewPage.module.less";

import { useScreenWidthWithin } from "@/utils/hooks";

interface UserViewPageParams {
  username?: string;
}

const UserViewPage: React.FC<{}> = (props) => {
  const params: UserViewPageParams = useParams();

  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState(
    {} as ApiTypes.GetUserDetailResponseDto,
  );

  const isMobile = useScreenWidthWithin(0, 577);

  async function getUserProfile(username: string) {
    const now = new Date();
    const { requestError, response } = await api.user.getUserDetail({
      username: username,
      timezone: getTimeZone(),
      now: now.toISOString(),
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setUserDetail(response);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserProfile(params.username);
  }, [params.username]);

  return (
    <BasicLayout current={"users"}>
      <div className={style.root}>
        {loading === true && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {loading === false && (
          <div className={style.tableRoot}>
            <Row gutter={16} align="top">
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <LeftPanel userDetail={userDetail} />
              </Col>
              <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                <div
                  style={{
                    marginTop: isMobile ? "10px" : "",
                  }}
                >
                  <DataView
                    acceptedProblemCount={userDetail.meta.acceptedProblemCount}
                    submissionCount={userDetail.meta.submissionCount}
                    rating={userDetail.meta.rating}
                  />
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <SubwayGraph
                    username={params.username}
                    submissionCountPerDay={userDetail.submissionCountPerDay}
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <RatingGraph />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default UserViewPage;
