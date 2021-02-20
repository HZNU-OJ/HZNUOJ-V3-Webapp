import React, { useState, useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Loading from '@/components/Loading';
import BasicLayout from '@/layouts/Basic';

import style from './UsersPage.module.less';
import AntTableHeadStyles from '@/less/AntTableHead.module.less';

import { useTableSearch } from '@/utils/hooks';

interface UserItem {
  rank: number;
  avatar: string;
  username: string;
  organization: string;
  acCount: number;
  rating: number;
}

enum UsersTableHeadTitle {
  rank = 'Rank',
  avatar = 'Avatar',
  username = 'Username',
  organization = 'Organization',
  acCount = 'AC.Count',
  rating = 'Rating',
}

function getTableDataSource(): UserItem[] {
  const dataSource: UserItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      rank: i,
      avatar: [
        'https://gravatar.loli.net/avatar/acf809998db9d18f454494decdfa1e0a?size=32&default=404',
        'https://q1.qlogo.cn/g?b=qq&nk=494143072&s=5',
      ][i % 2],
      username: 'Dup4',
      organization: 'Hangzhou Normal U',
      acCount: i * 100,
      rating: i * 200,
    });
  }
  return dataSource;
}

const UsersPage: React.FC<{}> = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const columns: ColumnsType<UserItem> = [
    {
      title: UsersTableHeadTitle.rank,
      dataIndex: 'rank',
      key: 'rank',
      width: 40,
      align: 'left',
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: UsersTableHeadTitle.avatar,
      dataIndex: 'avatar',
      key: 'avatar',
      width: 42,
      align: 'center',
      render: (avatarUrl: string) => (
        <img style={{ margin: -8 }} width={32} src={avatarUrl} alt="" />
      ),
    },
    {
      title: UsersTableHeadTitle.username,
      dataIndex: 'username',
      key: 'username',
      width: 180,
      align: 'left',
      ...useTableSearch('username', UsersTableHeadTitle.username),
    },
    {
      title: UsersTableHeadTitle.organization,
      dataIndex: 'organization',
      key: 'organization',
      width: 160,
      align: 'center',
      ...useTableSearch('organization', UsersTableHeadTitle.organization),
    },
    {
      title: UsersTableHeadTitle.acCount,
      dataIndex: 'acCount',
      key: 'acCount',
      width: 60,
      align: 'center',
      sorter: (a, b) => a.acCount - b.acCount,
    },
    {
      title: UsersTableHeadTitle.rating,
      dataIndex: 'rating',
      key: 'rating',
      width: 60,
      align: 'center',
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  return (
    <BasicLayout current={'users'}>
      <div className={style.root}>
        {loaded === false && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {loaded === true && (
          <div className={style.tableRoot}>
            <Table<UserItem>
              size="small"
              scroll={{ x: 1100 }}
              sticky
              columns={columns}
              dataSource={getTableDataSource()}
              className={AntTableHeadStyles.table}
              rowKey={(record) => record.rank}
              pagination={{
                hideOnSinglePage: true,
                showQuickJumper: true,
                showSizeChanger: true,
                defaultPageSize: 32,
                pageSizeOptions: ['8', '16', '32', '64', '128', '256'],
              }}
            />
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default UsersPage;
