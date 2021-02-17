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
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: '50px',
        align: 'left',
        fixed: 'left',
        sorter: (a: contestItem, b: contestItem) => a.id - b.id,
      },
      {
        title: 'Contest Name',
        dataIndex: 'contestName',
        key: 'contestName',
        width: '200px',
        align: 'left',
        fixed: 'left',
        ...this.getColumnSearchProps('contestName'),
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
        width: '1000px',
        align: 'center',
      },
      {
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
        width: '1000px',
        align: 'center',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        align: 'center',
        fixed: 'right',
      },
    ];
  }

  getTableDataSource(): ContestItem[] {
    const dataSource = [
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
      {
        id: 1,
        contestName: 'ddd',
        start: 2,
        length: 3,
        status: 4,
      },
    ];
    return dataSource as ContestItem[];
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

  getColumnSearchProps = (dataIndex) => ({
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

  handleReset = (clearFilters) => {
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
                  scroll={{ x: 1500 }}
                  sticky
                  columns={this.getTableColumns()}
                  dataSource={this.getTableDataSource()}
                  className={style.Table}
                  pagination={{
                    hideOnSinglePage: true,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    defaultPageSize: 32,
                    pageSizeOptions: ['8', '16', '32', '64', '128'],
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
