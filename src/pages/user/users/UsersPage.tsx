import React from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Input, Space, Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import style from './UsersPage.module.less';
import Loading from '@/components/Loading';
import BasicLayout from '@/layouts/Basic';
import AntTableHead from '@/less/AntTableHead.module.less';

interface UserItem {
  rank: number;
  username: string;
  organization: string;
  acCount: number;
  rating: number;
}

enum UsersTableHeadTitle {
  rank = 'Rank',
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
      username: 'Dup4',
      organization: 'Hangzhou Normal U',
      acCount: i * 100,
      rating: i * 200,
    });
  }
  return dataSource;
}

class ContestsPage extends React.Component {
  getTableColumns(): ColumnsType<UserItem> {
    const columns: ColumnsType<UserItem> = [
      {
        title: UsersTableHeadTitle.rank,
        dataIndex: 'rank',
        key: 'rank',
        width: '60px',
        align: 'left',
        sorter: (a, b) => a.rank - b.rank,
      },
      {
        title: UsersTableHeadTitle.username,
        dataIndex: 'username',
        key: 'username',
        width: '80px',
        align: 'left',
        ...this.getColumnSearchProps('username'),
      },
      {
        title: UsersTableHeadTitle.organization,
        dataIndex: 'organization',
        key: 'organization',
        width: '160px',
        align: 'center',
        ...this.getColumnSearchProps('organization'),
      },
      {
        title: UsersTableHeadTitle.acCount,
        dataIndex: 'acCount',
        key: 'acCount',
        width: '60px',
        align: 'center',
        sorter: (a, b) => a.acCount - b.acCount,
      },
      {
        title: UsersTableHeadTitle.rating,
        dataIndex: 'rating',
        key: 'rating',
        width: '60px',
        align: 'center',
        sorter: (a, b) => a.rating - b.rating,
      },
    ];
    return columns;
  }

  async UNSAFE_componentWillMount() {
    this.setState({
      loaded: true,
    });
  }

  constructor(props: any) {
    super(props);
  }

  state = {
    loaded: false,
  };

  getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#fff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <BasicLayout current={'users'}>
        <div className={style.root}>
          {this.state.loaded === false && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {this.state.loaded === true && (
            <div className={style.tableRoot}>
              <Table<UserItem>
                size="small"
                scroll={{ x: 920 }}
                sticky
                columns={this.getTableColumns()}
                dataSource={getTableDataSource()}
                className={AntTableHead.table}
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
  }
}

export default ContestsPage;
