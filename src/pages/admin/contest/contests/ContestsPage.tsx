import React, { useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AdminLayout from "@/layouts/AdminLayout";
import ContestListTable from "./components/ContestListTable";
import style from "./ContestPage.module.less";

const ContestsPage: React.FC<{}> = (props) => {
  return (
    <AdminLayout current="contests">
      <div className={style.root}>
        <div className={style.addBtn}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              // setAddJudgeMachineModalVisible(true);
            }}
          >
            Add Contest
          </Button>
        </div>

        <ContestListTable />
      </div>
    </AdminLayout>
  );
};

export default ContestsPage;
