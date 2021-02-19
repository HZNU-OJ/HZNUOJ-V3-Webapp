import React from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Input, Space, Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import style from './ProblemSetPage.less';
import Loading from '@/components/Loading';
import BasicLayout from '@/layouts/Basic';
import AntTableHead from '@/less/AntTableHead.less';

interface ProblemItem {
  id: number;
  problem: string;
  submissions: number;
  acceptance: number;
}

function getTableDataSource(): ProblemItem[] {
  const dataSource: ProblemItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      id: i,
      problem: 'A + B Problem',
      submissions: i * 1000,
      acceptance: (i * 367) % 10000,
    });
  }
  return dataSource;
}

class ContestsPage extends React.Component {
  getTableColumns(): ColumnsType<ProblemItem> {
    const columns: ColumnsType<ProblemItem> = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: '60px',
        align: 'left',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Problem',
        dataIndex: 'problem',
        key: 'problem',
        width: '540px',
        align: 'left',
        ...this.getColumnSearchProps('problem'),
        render: (problem: string) => {
          return (
            <Tooltip placement="top" title={problem}>
              <a href="/" className={['h-ellipsis'].join(' ')}>
                {problem}
              </a>
            </Tooltip>
          );
        },
      },
      {
        title: 'Submissions',
        dataIndex: 'submissions',
        key: 'submissions',
        width: '120px',
        align: 'right',
      },
      {
        title: 'Acceptance',
        dataIndex: 'acceptance',
        key: 'acceptance',
        width: '100px',
        align: 'right',
        render: (acceptance: number) => {
          return `${acceptance / 100}%`;
        },
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
      <BasicLayout current={'problemSet'}>
        <div className={style.root}>
          {this.state.loaded === false && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {this.state.loaded === true && (
            <div className={style.tableRoot}>
              <Table<ProblemItem>
                size="small"
                scroll={{ x: 1000 }}
                sticky
                columns={this.getTableColumns()}
                dataSource={getTableDataSource()}
                className={AntTableHead.Table}
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
          )}
        </div>
      </BasicLayout>
    );
  }
}

export default ContestsPage;
