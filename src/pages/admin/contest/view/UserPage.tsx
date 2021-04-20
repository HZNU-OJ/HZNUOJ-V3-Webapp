import React, { useState } from "react";
import ContestAdminLayout from "./components/ContestAdminLayout";
import { message, Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTableSearch, useTableFilter } from "@/utils/hooks";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useEffect } from "react";
import { useParams } from "umi";
import FormatTableDate from "@/components/FormatTableDate";
import style from "./UserPage.module.less";
import { PlusOutlined } from "@ant-design/icons";
import api from "@/api";

interface UserPageParams {
  id: string;
}

interface UserItem {
  id: number;
  username: string;
  nickname: string;
  email: string;
  registrationTime: Date;
}

enum UserTableHeadTitle {
  id = "#",
  username = "Username",
  nickname = "Nickname",
  email = "Email",
  registrationTime = "Registration Time",
}

const UserPage: React.FC<{}> = (props) => {
  const params = useParams() as UserPageParams;

  const [tableData, setTableData] = useState([] as UserItem[]);

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getContestUserList({
      contestId: parseInt(params.id),
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      setTableData(
        response.contestUserList.map((user) => ({
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          email: user.notificationEmail,
          registrationTime: new Date(user.registrationTime),
        })),
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<UserItem> = [
    {
      title: UserTableHeadTitle.username,
      dataIndex: "username",
      key: "username",
      width: "100px",
      align: "left",
      ...useTableSearch("username", UserTableHeadTitle.username),
      render: (username: string) => {
        return (
          <a href={`/user/${username}`} target={"_blank"}>
            {username}
          </a>
        );
      },
    },
    {
      title: UserTableHeadTitle.nickname,
      dataIndex: "nickname",
      key: "nickname",
      width: "100px",
      align: "left",
      ...useTableSearch("nickname", UserTableHeadTitle.nickname),
    },
    {
      title: UserTableHeadTitle.email,
      dataIndex: "email",
      key: "email",
      width: "100px",
      align: "left",
      ...useTableSearch("email", UserTableHeadTitle.email),
    },
    {
      title: UserTableHeadTitle.registrationTime,
      dataIndex: "registrationTime",
      key: "registrationTime",
      width: "100px",
      align: "left",
      sorter: (a: UserItem, b: UserItem) => {
        if (a.registrationTime < b.registrationTime) return -1;
        if (a.registrationTime > b.registrationTime) return 1;
        return 0;
      },
      render: (when) => <FormatTableDate date={when} />,
    },
  ];

  return (
    <ContestAdminLayout current="user">
      <div className={style.addBtn}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size={"middle"}
          onClick={() => {
            // setAddProblemModelVisible(true);
          }}
        >
          Add User
        </Button>
      </div>
      <div className={style.table}>
        <Table<UserItem>
          size="small"
          scroll={{ x: 800 }}
          sticky
          columns={columns}
          loading={fetchDataLoading}
          dataSource={tableData}
          className={AntTableHeadStyles.table}
          rowKey={(record) => record.id}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 16,
            pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
          }}
        />
      </div>
    </ContestAdminLayout>
  );
};

export default UserPage;
