import React, { useEffect, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import DiscussionsTable from "../components/DiscussionsTable";
import style from "./DiscussionsPage.module.less";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useModel } from "umi";
import { useUrlQuery } from "@/utils/hooks";

const DiscussionsPage: React.FC<{}> = (props) => {
  const location = useLocation();
  const history = useHistory();

  const [urlQuery, setUrlQUery] = useUrlQuery({
    publisherId: 0,
  });

  const { initialState, loading } = useModel("@@initialState");

  const [isMe, setIsMe] = useState(
    initialState?.userMeta?.id == urlQuery.publisherId,
  );

  return (
    <>
      <BasicLayout current={"discussions"}>
        <div className={style.root}>
          {isMe && (
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
          )}
          <div className={style.table}>
            <DiscussionsTable publisherId={urlQuery.publisherId} isMe={isMe} />
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionsPage;
