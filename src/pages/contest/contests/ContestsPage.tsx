import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import { ContestStatus } from "@/interface/Contest";
import { StatusBadge } from "../components";

import style from "./ContestsPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import { formatUnixTimeStamp } from "@/utils/formatDateTime";

import { useTableSearch, useTableFilter } from "@/utils/hooks";

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
  id = "#",
  contestName = "Contest Name",
  writers = "Writers",
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
      contestName: `2020 Intelligent Video Coding Contest ${i}`,
      writers: ["Dup4", "Hsueh-", "ltslts"].join(", "),
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
      register: "",
      mode: "ICPC",
    });
  }
  return dataSource;
}

const ContestsPage: React.FC<{}> = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const columns: ColumnsType<ContestItem> = [
    {
      title: ContestTableHeadTitle.contestName,
      dataIndex: "contestName",
      key: "contestName",
      width: "320px",
      align: "center",
      ...useTableSearch("contestName", ContestTableHeadTitle.contestName),
      render: (contestName: string) => {
        return (
          <Tooltip placement="top" title={contestName}>
            <a href="/" className={["h-ellipsis"].join(" ")}>
              {contestName}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ContestTableHeadTitle.writers,
      dataIndex: "writers",
      key: "writers",
      width: "100px",
      align: "center",
      ...useTableSearch("writers", ContestTableHeadTitle.writers),
    },
    {
      title: ContestTableHeadTitle.start,
      dataIndex: "start",
      key: "start",
      width: "160px",
      align: "center",
      sorter: (a, b) => a.start - b.start,
      render: contestTimeRender,
    },
    {
      title: ContestTableHeadTitle.end,
      dataIndex: "end",
      key: "end",
      width: "160px",
      align: "center",
      sorter: (a, b) => a.end - b.end,
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
    {
      title: "Register",
      dataIndex: "register",
      key: "register",
      width: "100px",
      align: "center",
    },
    {
      title: "Standings",
      dataIndex: "standings",
      key: "standings",
      width: "100px",
      align: "center",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
      width: "100px",
      align: "center",
      ...useTableFilter(
        "mode",
        "Mode",
        [ContestMode.icpc, ContestMode.ioi, ContestMode.codeForces].map(
          (item: string) => {
            return {
              title: <b>{item}</b>,
              value: item,
            };
          },
        ),
        160,
      ),
    },
  ];

  return (
    <BasicLayout current={"contests"}>
      <div className={style.root}>
        {loaded === false && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {loaded === true && (
          <div className={style.tableRoot}>
            <Table<ContestItem>
              size="small"
              scroll={{ x: 920 }}
              sticky
              columns={columns}
              dataSource={getTableDataSource()}
              className={AntTableHeadStyles.table}
              rowKey={(record) => record.id}
              pagination={{
                hideOnSinglePage: true,
                showQuickJumper: true,
                showSizeChanger: true,
                defaultPageSize: 32,
                pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
              }}
            />
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default ContestsPage;
