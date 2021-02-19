import React from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Input, Space, Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import style from './ContestsPage.module.less';
import Loading from '@/components/Loading';
import BasicLayout from '@/layouts/Basic';
import AntTableHead from '@/less/AntTableHead.module.less';
import { formatUnixTimeStamp } from '@/utils/formatDateTime';
import { ContestStatus } from '@/interface/Contest';
import { StatusBadge } from '../components';

interface ContestItem {
  id: number;
  contestName: string;
  writers: string;
  start: number;
  end: number;
  status: string;
  register: string;
  mode: string;
}

enum ContestTableHeadTitle {
  id = '#',
  contestName = 'Contest Name',
  writers = 'Writers',
  start = 'Start',
  end = 'End',
  status = 'Status',
  register = 'Register',
  mode = 'Mode',
}

function contestTimeRender(unixTimeStamp: string | number) {
  const shortTimeFormat = 'MM/DD HH:mm';
  const longTimeFormat = 'YYYY-MM-DD HH:mm:ss';
  return (
    <Tooltip
      placement="top"
      title={formatUnixTimeStamp(unixTimeStamp, longTimeFormat)}
    >
      {formatUnixTimeStamp(unixTimeStamp, shortTimeFormat)}
    </Tooltip>
  );
}

enum ContestMode {
  icpc = 'ICPC',
  ioi = 'IOI',
  codeForces = 'CodeForces',
}

function Frozen2Running(status: string) {
  return status.replace('FROZEN', 'RUNNING');
}

function getTableDataSource(): ContestItem[] {
  const dataSource: ContestItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      id: i,
      contestName: `2020 Intelligent Video Coding Contest ${i}`,
      writers: ['Dup4', 'Hsueh-', 'ltslts'].join(', '),
      start: 1613656156 + i * 100,
      end: 1613656156 + 10 * i * 100,
      status: Frozen2Running(
        [
          ContestStatus.pending,
          ContestStatus.running,
          ContestStatus.frozen,
          ContestStatus.finished,
        ][i - 1 > 2 ? 3 : i - 1],
      ),
      register: '',
      mode: 'ICPC',
    });
  }
  return dataSource;
}

class ContestsPage extends React.Component {
  getTableColumns(): ColumnsType<ContestItem> {
    const columns: ColumnsType<ContestItem> = [
      {
        title: ContestTableHeadTitle.contestName,
        dataIndex: 'contestName',
        key: 'contestName',
        width: '320px',
        align: 'center',
        ...this.getColumnSearchProps('contestName'),
        render: (contestName: string) => {
          return (
            <Tooltip placement="top" title={contestName}>
              <a href="/" className={['h-ellipsis'].join(' ')}>
                {contestName}
              </a>
            </Tooltip>
          );
        },
      },
      {
        title: ContestTableHeadTitle.writers,
        dataIndex: 'writers',
        key: 'writers',
        width: '100px',
        align: 'center',
        ...this.getColumnSearchProps('writers'),
      },
      {
        title: ContestTableHeadTitle.start,
        dataIndex: 'start',
        key: 'start',
        width: '160px',
        align: 'center',
        sorter: (a, b) => a.start - b.start,
        render: contestTimeRender,
      },
      {
        title: ContestTableHeadTitle.end,
        dataIndex: 'end',
        key: 'end',
        width: '160px',
        align: 'center',
        sorter: (a, b) => a.end - b.end,
        render: contestTimeRender,
      },
      {
        title: ContestTableHeadTitle.status,
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        align: 'center',
        filters: [
          { text: ContestStatus.pending, value: ContestStatus.pending },
          { text: ContestStatus.running, value: ContestStatus.running },
          { text: ContestStatus.finished, value: ContestStatus.finished },
        ],
        onFilter: (status, record) => record.status === status,
        render: StatusBadge,
      },
      {
        title: 'Register',
        dataIndex: 'register',
        key: 'register',
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
      {
        title: 'Mode',
        dataIndex: 'mode',
        key: 'mode',
        width: '100px',
        align: 'center',
        filters: [
          { text: ContestMode.icpc, value: ContestMode.icpc },
          { text: ContestMode.ioi, value: ContestMode.ioi },
          { text: ContestMode.codeForces, value: ContestMode.codeForces },
        ],
        onFilter: (mode, record) => record.mode === mode,
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
      <BasicLayout current={'contests'}>
        <div className={style.root}>
          {this.state.loaded === false && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {this.state.loaded === true && (
            <div className={style.tableRoot}>
              <Table<ContestItem>
                size="small"
                scroll={{ x: 920 }}
                sticky
                columns={this.getTableColumns()}
                dataSource={getTableDataSource()}
                className={AntTableHead.table}
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
