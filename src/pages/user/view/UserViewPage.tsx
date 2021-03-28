import React, { useState, useEffect } from "react";
import { useModel, useParams } from "umi";
import { Row, Col } from "antd";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";

import { DataView, LeftPanel, SubwayGraph, RatingGraph } from "./components";

import style from "./UserViewPage.module.less";

import api from "@/api";

import { useScreenWidthWithin } from "@/utils/hooks";

interface UserViewPageParams {
  username?: string;
}

const UserViewPage: React.FC<{}> = (props) => {
  const params: UserViewPageParams = useParams();
  const { initialState } = useModel("@@initialState");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(
    {} as ApiTypes.GetUserProfileResponseDto,
  );

  const isMobile = useScreenWidthWithin(0, 577);

  async function getUserProfile(username: string) {
    const { requestError, response } = await api.user.getUserMeta({
      username: username,
    });

    if (response) {
      setProfile(response);
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
                <LeftPanel profile={profile} />
              </Col>
              <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                <div
                  style={{
                    marginTop: isMobile ? "10px" : "",
                  }}
                >
                  <DataView />
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <SubwayGraph />
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
