import React from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Input, Space, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from './ContestsPage.less';
import Loading from '@/components/Loading';
import BasicLayout from '@/layouts/Basic';

interface ContestItem {
  id: number;
  contestName: string;
  start: number;
  length: number;
  status: number;
}

class ContestsPage extends React.Component {
  getTableColumns() {
    return [
      // {
      //   title: '#',
      //   dataIndex: 'id',
      //   key: 'id',
      //   width: '80px',
      //   align: 'left',
      //   fixed: 'left',
      //   sorter: (a: ContestItem, b: ContestItem) => a.id - b.id,
      // },
      {
        title: 'Contest Name',
        dataIndex: 'contestName',
        key: 'contestName',
        width: '320px',
        align: 'center',
        fixed: 'left',
        ...this.getColumnSearchProps('contestName', 'ContestName'),
        render: (contestName: string) => {
          return (
            <Tooltip placement="top" title={contestName}>
              <span className={'h-ellipsis'}>{contestName}</span>
            </Tooltip>
          );
        },
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        width: '200px',
        align: 'center',
      },
      {
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
        width: '200px',
        align: 'center',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        align: 'center',
      },
      {
        title: 'Standings',
        dataIndex: 'standings',
        key: 'standings',
        width: '100px',
        align: 'center',
      },
    ];
  }

  getTableDataSource(): ContestItem[] {
    const dataSource: ContestItem[] = [];
    for (let i = 1; i <= 100; ++i) {
      dataSource.push({
        id: i,
        contestName: `2020 Intelligent Video Coding Contest ${i}`,
        start: 2,
        length: 3,
        status: 4,
      });
    }
    return dataSource;
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
    columns: [],
    tableData: [],
    title: '',
  };

  getColumnSearchProps = (dataIndex: string, title?: string) => ({
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
          placeholder={`Search ${title || dataIndex}`}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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

  handleSearch = (selectedKeys, confirm, dataIndex) => {
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
      <BasicLayout current={'contests'}>
        <div className={style.root}>
          {this.state.loaded === false && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {this.state.loaded === true && (
            <>
              <div className={style.tableRoot}>
                <Table
                  size="small"
                  scroll={{ x: 920 }}
                  sticky
                  columns={this.getTableColumns()}
                  dataSource={this.getTableDataSource()}
                  className={style.Table}
                  rowKey={(record) => record.id}
                  pagination={{
                    hideOnSinglePage: true,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    defaultPageSize: 32,
                    pageSizeOptions: ['8', '16', '32', '64', '128', '256'],
                  }}
                />
              </div>
            </>
          )}
        </div>
      </BasicLayout>
    );
  }
}

export default ContestsPage;
