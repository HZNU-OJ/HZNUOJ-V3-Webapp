import React, { useEffect, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import DiscussionsTable from "../components/DiscussionsTable";
import style from "./DiscussionsPage.module.less";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useModel } from "umi";

const DiscussionsPage: React.FC<{}> = (props) => {
  const location = useLocation();
  const history = useHistory();

  const { initialState, loading } = useModel("@@initialState");

  const [isMe, setIsMe] = useState(
    initialState.userMeta.id == (location?.query?.publisherId ?? 0),
  );

  const [publisherId, setPublisherId] = useState(
    location?.query?.publisherId ?? 0,
  );

  return (
    <>
      <BasicLayout current={"discussions"}>
        <div className={style.root}>
          <div className={style.addBtn}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={"middle"}
              onClick={() => {
                history.push("/discussion/new");
              }}
            >
              Add Discussion
            </Button>
          </div>
          <div className={style.table}>
            <DiscussionsTable publisherId={publisherId} isMe={isMe} />
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionsPage;
