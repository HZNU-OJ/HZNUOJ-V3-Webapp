import React from "react";
import Highlighter from "react-highlight-words";
import { Table, Input, Space, Button, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import style from "./SubmissionsPage.module.less";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/Basic";
import AntTableHead from "@/less/AntTableHead.module.less";
import { formatUnixTimeStamp } from "@/utils/formatDateTime";

import {
  SubmissionStatusType,
  SubmissionLangType,
  SubmissionLangTypeTitle,
  SubmissionStatusTypeTitle,
} from "@/interface/Submission";

interface SubmissionItem {
  id: number;
  status: string;
  who: string;
  when: number;
  problem: string;
  time: number;
  memory: number;
  lang: string;
  codeLength: number;
}

enum SubmissionTableHeadTitle {
  id = "#",
  status = "Status",
  who = "Who",
  when = "When",
  problem = "Problem",
  time = "Time",
  memory = "Memory",
  lang = "Lang",
  codeLength = "Code Length",
}

function submissionDateRender(unixTimeStamp: string | number) {
  const shortTimeFormat = "MM/DD HH:mm";
  const longTimeFormat = "YYYY-MM-DD HH:mm:ss";
  return (
    <Tooltip
      placement="top"
      title={formatUnixTimeStamp(unixTimeStamp, longTimeFormat)}
    >
      {formatUnixTimeStamp(unixTimeStamp, shortTimeFormat)}
    </Tooltip>
  );
}

function submissionTimeRender(time: number) {
  return `${time} ms`;
}

function submissionMemoryRender(memory: number) {
  return `${memory} kb`;
}

function submissionCodeLengthRender(codeLength: number) {
  return `${codeLength} B`;
}

function getTableDataSource(): SubmissionItem[] {
  const dataSource: SubmissionItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      id: i,
      status: SubmissionStatusTypeTitle[i % SubmissionStatusTypeTitle.length],
      who: "Dup4",
      when: 1613656156 + i * 100,
      problem: "#1. A + B Problem",
      time: 123 * i,
      memory: 321 * i,
      lang: SubmissionLangTypeTitle[i % SubmissionLangTypeTitle.length],
      codeLength: 222 * i,
    });
  }
  return dataSource;
}

class SubmissionsPage extends React.Component {
  getTableColumns(): ColumnsType<SubmissionItem> {
    const columns: ColumnsType<SubmissionItem> = [
      {
        title: SubmissionTableHeadTitle.id,
        dataIndex: "id",
        key: "id",
        width: "40px",
        align: "left",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: SubmissionTableHeadTitle.problem,
        dataIndex: "problem",
        key: "problem",
        width: "120px",
        align: "left",
        ...this.getColumnSearchProps("problem"),
      },
      {
        title: SubmissionTableHeadTitle.status,
        dataIndex: "status",
        key: "status",
        width: "120px",
        align: "center",
      },
      {
        title: SubmissionTableHeadTitle.when,
        dataIndex: "when",
        key: "when",
        width: "60px",
        align: "left",
        sorter: (a, b) => a.when - b.when,
        render: submissionDateRender,
      },
      {
        title: SubmissionTableHeadTitle.who,
        dataIndex: "who",
        key: "who",
        width: "60px",
        align: "left",
        ...this.getColumnSearchProps("who"),
        render: (who: string) => <a href="">{who}</a>,
      },
      {
        title: SubmissionTableHeadTitle.lang,
        dataIndex: "lang",
        key: "lang",
        width: "60px",
        align: "center",
      },
      {
        title: SubmissionTableHeadTitle.time,
        dataIndex: "time",
        key: "time",
        width: "60px",
        align: "center",
        sorter: (a, b) => a.time - b.time,
        render: submissionTimeRender,
      },
      {
        title: SubmissionTableHeadTitle.memory,
        dataIndex: "memory",
        key: "memory",
        width: "60px",
        align: "center",
        sorter: (a, b) => a.memory - b.memory,
        render: submissionMemoryRender,
      },
      {
        title: SubmissionTableHeadTitle.codeLength,
        dataIndex: "codeLength",
        key: "codeLength",
        width: "80px",
        align: "center",
        sorter: (a, b) => a.codeLength - b.codeLength,
        render: submissionCodeLengthRender,
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
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
      <SearchOutlined style={{ color: filtered ? "#fff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
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
    this.setState({ searchText: "" });
  };

  render() {
    return (
      <BasicLayout current={"submissions"}>
        <div className={style.root}>
          {this.state.loaded === false && (
            <div className={style.loading}>
              <Loading />
            </div>
          )}

          {this.state.loaded === true && (
            <div className={style.tableRoot}>
              <Table<SubmissionItem>
                size="small"
                scroll={{ x: 1300 }}
                sticky
                columns={this.getTableColumns()}
                dataSource={getTableDataSource()}
                className={AntTableHead.table}
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
          )}
        </div>
      </BasicLayout>
    );
  }
}

export default SubmissionsPage;
