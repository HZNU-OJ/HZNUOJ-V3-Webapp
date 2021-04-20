import React, { useState } from "react";
import ContestAdminLayout from "./components/ContestAdminLayout";
import { message, Table, Button, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTableSearch, useTableFilter } from "@/utils/hooks";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useEffect } from "react";
import { useParams } from "umi";
import FormatTableDate from "@/components/FormatTableDate";
import style from "./UserPage.module.less";
import { PlusOutlined } from "@ant-design/icons";
import AddUserModel from "./components/AddUserModel";
import api from "@/api";

import { DeleteOutlined } from "@ant-design/icons";

const DeleteIcon = () => (
  <DeleteOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

interface UserPageParams {
  id: string;
}

interface ActionItem {
  userId: number;
}

interface UserItem {
  id: number;
  username: string;
  nickname: string;
  email: string;
  registrationTime: Date;
  action: ActionItem;
}

enum UserTableHeadTitle {
  id = "#",
  username = "Username",
  nickname = "Nickname",
  email = "Email",
  registrationTime = "Registration Time",
  action = "Action",
}

const UserPage: React.FC<{}> = (props) => {
  const params = useParams() as UserPageParams;

  const [tableData, setTableData] = useState([] as UserItem[]);
  const [addUserModelVisible, setAdduserModelVisible] = useState(false);

  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  async function onDeleteUser(userId: number) {
    setDeleteUserLoading(true);
    const { requestError, response } = await api.contest.deleteContestUser({
      contestId: parseInt(params.id),
      userId,
    });
    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success(`Delete User(${userId}) Successfully!`);
    }
    setDeleteUserLoading(false);
  }

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
          action: {
            userId: user.id,
          },
        })),
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [addUserModelVisible, deleteUserLoading]);

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
    {
      title: UserTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: "60px",
      align: "left",
      render: (action: ActionItem) => {
        return (
          <Space size={"middle"}>
            <Popconfirm
              title={`Are you sure to delete the user?`}
              onConfirm={() => {
                onDeleteUser(action.userId);
              }}
              okText="Yes"
              cancelText="No"
              placement="top"
              okButtonProps={{
                loading: deleteUserLoading,
              }}
            >
              <a>
                <DeleteIcon />
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <ContestAdminLayout current="user">
        <div className={style.addBtn}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              setAdduserModelVisible(true);
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
      <AddUserModel
        contestId={parseInt(params.id)}
        visible={addUserModelVisible}
        onCancel={() => setAdduserModelVisible(false)}
      />
    </>
  );
};

export default UserPage;
