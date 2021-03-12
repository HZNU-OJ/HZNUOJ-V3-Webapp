import React, { useState, useEffect } from "react";
import { useModel, useParams } from "umi";
import { Row, Col } from "antd";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import UserAvatar from "@/components/UserAvatar";

import style from "./UserViewPage.module.less";

import api from "@/api";

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

  async function getUserProfile(username: string) {
    const { requestError, response } = await api.user.getUserProfile({
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
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <UserAvatar userAvatar={profile.meta.avatar} imageSize={220} />
                <div className={style.username}>{profile.meta.username}</div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={18} xl={18}></Col>
            </Row>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default UserViewPage;
