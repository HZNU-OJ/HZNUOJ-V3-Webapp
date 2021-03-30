import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import BasicLayout from "@/layouts/BasicLayout";
import { ContestStatus } from "@/interface/Contest";
import { StatusBadge } from "../components";

import style from "./ContestsPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import FormatTableDate from "@/components/FormatTableDate";
import { formatUnixTimeStamp } from "@/utils/formatDateTime";

import { useTableSearch, useTableFilter } from "@/utils/hooks";

import { getNowTimeStamp } from "@/pages/contest/utils";

export function getStatus(
  start_time: number,
  end_time: number,
  frozen_time: number,
) {
  const now = getNowTimeStamp();
  if (now < start_time) return ContestStatus.pending;
  if (now >= end_time) return ContestStatus.finished;
  if (now >= end_time - frozen_time) return ContestStatus.frozen;
  return ContestStatus.running;
}

interface ContestItem {
  id: number;
  contestName: string;
  start: number;
  end: number;
  frozenTime: number;
  status: string;
  register: string;
  mode: string;
}

enum ContestTableHeadTitle {
  id = "#",
  contestName = "Contest Name",
  start = "Start",
  end = "End",
  status = "Status",
  register = "Register",
  mode = "Mode",
}

function contestTimeRender(unixTimeStamp: string | number) {
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

enum ContestMode {
  icpc = "ICPC",
  ioi = "IOI",
  codeForces = "CodeForces",
}

function Frozen2Running(status: string) {
  return status.replace("FROZEN", "RUNNING");
}

function getTableDataSource(): ContestItem[] {
  const dataSource: ContestItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      id: i,
      contestName: `The Hangzhou Normal U Qualification Trials for ZJPSC 2021`,
      start: 1613656156 + i * 100,
      end: 1613656156 + 10 * i * 100,
      frozenTime: 3600,
      status: Frozen2Running(
        [
          ContestStatus.pending,
          ContestStatus.running,
          ContestStatus.frozen,
          ContestStatus.finished,
        ][i - 1 > 2 ? 3 : i - 1],
      ),
      register: "",
      mode: "ICPC",
    });
  }
  return dataSource;
}

const ContestsPage: React.FC<{}> = (props) => {
  const [tableData, setTableData] = useState(null);

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const startTime = 1617165000;
    const endTime = 1617183000;
    const frozenTime = 3600;
    let _tableData: ContestItem[] = [];
    _tableData.push({
      id: 1,
      contestName: "The Hangzhou Normal U Qualification Trials for ZJPSC 2021",
      start: startTime,
      end: endTime,
      frozenTime: frozenTime,
      status: getStatus(startTime, endTime, frozenTime),
      register: "",
      mode: "ICPC",
    });
    setTableData(_tableData);
    setFetchDataLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<ContestItem> = [
    {
      title: ContestTableHeadTitle.contestName,
      dataIndex: "contestName",
      key: "contestName",
      width: "480px",
      align: "left",
      ...useTableSearch("contestName", ContestTableHeadTitle.contestName),
      render: (contestName: string) => {
        return (
          <Tooltip placement="top" title={contestName}>
            <a href="/contest/2" className={["h-ellipsis"].join(" ")}>
              {contestName}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ContestTableHeadTitle.start,
      dataIndex: "start",
      key: "start",
      width: "120px",
      align: "center",
      // sorter: (a, b) => a.start - b.start,
      render: contestTimeRender,
    },
    {
      title: ContestTableHeadTitle.end,
      dataIndex: "end",
      key: "end",
      width: "120px",
      align: "center",
      // sorter: (a, b) => a.end - b.end,
      render: contestTimeRender,
    },
    {
      title: ContestTableHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ...useTableFilter(
        "status",
        "Status",
        [
          ContestStatus.pending,
          ContestStatus.running,
          ContestStatus.finished,
        ].map((item: string) => {
          return {
            title: StatusBadge(item),
            value: item,
          };
        }),
        160,
      ),
      render: StatusBadge,
    },
    // {
    //   title: "Register",
    //   dataIndex: "register",
    //   key: "register",
    //   width: "100px",
    //   align: "center",
    // },
    // {
    //   title: "Standings",
    //   dataIndex: "standings",
    //   key: "standings",
    //   width: "100px",
    //   align: "center",
    // },
    // {
    //   title: "Mode",
    //   dataIndex: "mode",
    //   key: "mode",
    //   width: "100px",
    //   align: "center",
    //   ...useTableFilter(
    //     "mode",
    //     "Mode",
    //     [ContestMode.icpc, ContestMode.ioi, ContestMode.codeForces].map(
    //       (item: string) => {
    //         return {
    //           title: <b>{item}</b>,
    //           value: item,
    //         };
    //       },
    //     ),
    //     160,
    //   ),
    // },
  ];

  return (
    <BasicLayout current={"contests"}>
      <div className={style.root}>
        <div className={style.tableRoot}>
          <Table<ContestItem>
            loading={fetchDataLoading}
            size="small"
            scroll={{ x: 1100 }}
            sticky
            columns={columns}
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
      </div>
    </BasicLayout>
  );
};

export default ContestsPage;
