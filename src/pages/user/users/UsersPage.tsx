import React, { useState, useEffect } from "react";
import { Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import BasicLayout from "@/layouts/BasicLayout";
import UserAvatar from "@/components/UserAvatar";
import style from "./UsersPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import { useTableSearch } from "@/utils/hooks";

import api from "@/api";

interface UserItem {
  rank: number;
  avatar: ApiTypes.UserAvatarDto;
  username: string;
  organization?: string;
  acCount: number;
  rating: number;
}

enum UsersTableHeadTitle {
  rank = "Rank",
  avatar = "Avatar",
  username = "Username",
  organization = "Organization",
  acCount = "AC.Count",
  rating = "Rating",
}

const UsersPage: React.FC<{}> = (props) => {
  const [fetchDataLoading, setFetchDataLoading] = useState(true);

  const [tableData, setTableData] = useState([] as UserItem[]);

  async function fetchData() {
    const { requestError, response } = await api.user.getUserList({
      sortBy: "acceptedProblemCount",
      hasContestUser: false,
      skipCount: 0,
      takeCount: 1000000,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      let _tableData: UserItem[] = [];
      response.userMetas.forEach((userMeta, index) => {
        _tableData.push({
          rank: index + 1,
          avatar: userMeta.avatar,
          username: userMeta.username,
          acCount: userMeta.acceptedProblemCount,
          rating: userMeta.rating,
        });
      });
      setTableData(_tableData);
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<UserItem> = [
    {
      title: UsersTableHeadTitle.rank,
      dataIndex: "rank",
      key: "rank",
      width: "24px",
      align: "left",
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: UsersTableHeadTitle.avatar,
      dataIndex: "avatar",
      key: "avatar",
      width: "38px",
      align: "left",
      render: (avatar) => (
        <div style={{ width: "32px", height: "32px", margin: 0, padding: 0 }}>
          <UserAvatar userAvatar={avatar} imageSize={32} />
        </div>
      ),
    },
    {
      title: UsersTableHeadTitle.username,
      dataIndex: "username",
      key: "username",
      width: "520px",
      align: "left",
      ...useTableSearch("username", UsersTableHeadTitle.username),
      render: (username: string) => (
        <a href={`/user/${username}`}>{username}</a>
      ),
    },
    // {
    //   title: UsersTableHeadTitle.organization,
    //   dataIndex: "organization",
    //   key: "organization",
    //   width: 160,
    //   align: "center",
    //   ...useTableSearch("organization", UsersTableHeadTitle.organization),
    // },
    {
      title: UsersTableHeadTitle.acCount,
      dataIndex: "acCount",
      key: "acCount",
      width: "48px",
      align: "center",
      sorter: (a, b) => a.acCount - b.acCount,
    },
    {
      title: UsersTableHeadTitle.rating,
      dataIndex: "rating",
      key: "rating",
      width: "48px",
      align: "center",
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  return (
    <BasicLayout current={"users"}>
      <div className={style.root}>
        <div className={style.tableRoot}>
          <Table<UserItem>
            loading={fetchDataLoading}
            size="small"
            scroll={{ x: 1100 }}
            sticky
            columns={columns}
            dataSource={tableData}
            className={AntTableHeadStyles.table}
            rowKey={(record) => record.rank}
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: 16,
              pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
            }}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default UsersPage;
