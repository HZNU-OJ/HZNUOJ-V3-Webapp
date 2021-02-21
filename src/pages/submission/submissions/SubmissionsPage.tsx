import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/Basic";

import { formatUnixTimeStamp } from "@/utils/formatDateTime";

import { useTableFilter, useTableSearch } from "@/utils/hooks";

import styles from "./SubmissionsPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

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

const SubmissionsPage: React.FC<{}> = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
      ...useTableSearch("problem", SubmissionTableHeadTitle.problem),
    },
    {
      title: SubmissionTableHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: "120px",
      align: "center",
      ...useTableFilter(
        "status",
        SubmissionTableHeadTitle.status,
        SubmissionStatusTypeTitle.map((item: string) => {
          return {
            title: <b>{item}</b>,
            value: item,
          };
        }),
      ),
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
      ...useTableSearch("who", SubmissionTableHeadTitle.who),
      render: (who: string) => <a href="">{who}</a>,
    },
    {
      title: SubmissionTableHeadTitle.lang,
      dataIndex: "lang",
      key: "lang",
      width: "60px",
      align: "center",
      ...useTableFilter(
        "lang",
        SubmissionTableHeadTitle.lang,
        SubmissionLangTypeTitle.map((item: string) => {
          return {
            title: <b>{item}</b>,
            value: item,
          };
        }),
        160,
      ),
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

  return (
    <BasicLayout current={"submissions"}>
      <div className={styles.root}>
        {loaded === false && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}

        {loaded === true && (
          <div className={styles.tableRoot}>
            <Table<SubmissionItem>
              size="small"
              scroll={{ x: 1300 }}
              sticky
              columns={columns}
              dataSource={getTableDataSource()}
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
        )}
      </div>
    </BasicLayout>
  );
};

export default SubmissionsPage;
