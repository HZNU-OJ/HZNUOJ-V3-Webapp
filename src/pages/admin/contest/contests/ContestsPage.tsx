import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AdminLayout from "@/layouts/AdminLayout";
import ContestListTable from "./components/ContestListTable";
import style from "./ContestPage.module.less";
import AddContestModel from "./components/AddContestModel";

const ContestsPage: React.FC<{}> = (props) => {
  const [addContestModelVisible, setAddContestModelVisible] = useState(false);
  const [contestListFetchHook, setContestListFetchHook] = useState(0);

  return (
    <>
      <AdminLayout current="contests">
        <div className={style.root}>
          <div className={style.addBtn}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={"middle"}
              onClick={() => {
                setAddContestModelVisible(true);
              }}
            >
              Add Contest
            </Button>
          </div>
          <ContestListTable fetchHook={contestListFetchHook} />
        </div>
      </AdminLayout>
      <AddContestModel
        visible={addContestModelVisible}
        onCancel={() => {
          setAddContestModelVisible(false);
          setContestListFetchHook(
            (contestListFetchHook) => contestListFetchHook + 1,
          );
        }}
      />
    </>
  );
};

export default ContestsPage;
