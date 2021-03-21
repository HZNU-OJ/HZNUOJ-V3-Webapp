import React from "react";
import BasicLayout from "@/layouts/BasicLayout";
import DiscussionsTable from "../components/DiscussionsTable";
import style from "./DiscussionsPage.module.less";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "umi";

const DiscussionsPage: React.FC<{}> = (props) => {
  const history = useHistory();
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
            <DiscussionsTable />
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default DiscussionsPage;
