import React, { useState, useEffect } from "react";
import { useModel, useParams } from "umi";
import { Row, Col } from "antd";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import UserAvatar from "@/components/UserAvatar";

import style from "./UserViewPage.module.less";

interface UserViewPageParams {
  username?: string;
}

const UserViewPage: React.FC<{}> = (props) => {
  const params: UserViewPageParams = useParams();
  const { initialState } = useModel("@@initialState");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <BasicLayout current={"users"}>
      <div className={style.root}>
        {loaded === false && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {loaded === true && (
          <div className={style.tableRoot}>
            <Row gutter={16} align="top">
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                {/* <UserAvatar
                      userAvatar={getAvatar(avatarType, {
                        gravatar: email,
                        qq: qq,
                        github: github,
                      })}
                      imageSize={220}
                    /> */}
              </Col>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}></Col>
            </Row>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default UserViewPage;
