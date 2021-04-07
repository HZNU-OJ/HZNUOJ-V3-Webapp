import React, { useState, useEffect } from "react";
import { message, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { ContestStatus } from "@/interface/Contest";
import { StatusBadge } from "../components";

import { useTableSearch, useTableFilter } from "@/utils/hooks";
import { changeTimeStampToDate } from "@/utils/formatDateTime";
import FormatTableDate from "@/components/FormatTableDate";

import style from "./ContestListTable.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import api from "@/api";

export function getStatus(
  startTime: Date | string | number,
  endTime: Date | string | number,
  frozenStartTime: Date | string | number,
  frozenEndTime: Date | string | number,
) {
  const now = new Date();
  startTime = changeTimeStampToDate(startTime);
  endTime = changeTimeStampToDate(endTime);
  frozenStartTime = changeTimeStampToDate(frozenStartTime);
  frozenEndTime = changeTimeStampToDate(frozenEndTime);

  if (now < startTime) return ContestStatus.pending;
  if (now > endTime) return ContestStatus.finished;
  if (now >= frozenStartTime && now <= frozenEndTime)
    return ContestStatus.frozen;
  return ContestStatus.running;
}

interface ContestNameItem {
  name: string;
  id: number;
}

interface ContestItem {
  id: number;
  contestName: ContestNameItem;
  startTime: string;
  endTime: string;
  frozenStartTime?: string;
  frozenEndTime?: string;
  status?: string;
  register?: string;
  mode?: string;
}

enum ContestTableHeadTitle {
  id = "#",
  contestName = "Contest Name",
  startTime = "Start",
  endTime = "End",
  status = "Status",
  register = "Register",
  mode = "Mode",
}

const ContestListTable: React.FC<{}> = (props) => {
  const [tableData, setTableData] = useState([] as ContestItem[]);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchData() {
    const { requestError, response } = await api.contest.getContestList({
      hasPrivate: true,
      skipCount: 0,
      takeCount: 1000000,
    });

    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      setTableData(
        response.contestMetas.map((contest) => ({
          id: contest.id,
          contestName: {
            name: contest.contestName,
            id: contest.id,
          },
          startTime: contest.startTime,
          endTime: contest.endTime,
          frozenStartTime: contest.frozenStartTime ?? null,
          frozenEndTime: contest.frozenEndTime ?? null,
          status: getStatus(
            changeTimeStampToDate(contest.startTime),
            changeTimeStampToDate(contest.endTime),
            changeTimeStampToDate(contest.frozenStartTime),
            changeTimeStampToDate(contest.frozenEndTime),
          ),
        })),
      );
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<ContestItem> = [
    {
      title: ContestTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "48px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: ContestTableHeadTitle.contestName,
      dataIndex: "contestName",
      key: "contestName",
      width: "480px",
      align: "left",
      // ...useTableSearch("contestName", ContestTableHeadTitle.contestName),
      render: (contestName: ContestNameItem) => {
        return (
          <Tooltip placement="top" title={contestName.name}>
            <a
              href={`/contest/${contestName.id}`}
              className={["h-ellipsis"].join(" ")}
            >
              {contestName.name}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ContestTableHeadTitle.startTime,
      dataIndex: "startTime",
      key: "starttime",
      width: "120px",
      align: "center",
      sorter: (a, b) => {
        if (a.endTime < b.endTime) return -1;
        if (a.endTime > b.endTime) return 1;
      },
      render: (startTime: Date) => <FormatTableDate date={startTime} />,
    },
    {
      title: ContestTableHeadTitle.endTime,
      dataIndex: "endTime",
      key: "endTime",
      width: "120px",
      align: "center",
      sorter: (a, b) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
      },
      render: (endTime: Date) => <FormatTableDate date={endTime} />,
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
          ContestStatus.frozen,
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
  );
};

export default ContestListTable;
