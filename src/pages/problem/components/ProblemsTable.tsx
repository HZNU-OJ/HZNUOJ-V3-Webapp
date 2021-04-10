import React, { useState, useEffect } from "react";
import { Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import style from "./ProblemsTable.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import {
  ProblemSolvedStatus,
  getStatus,
  ProblemStatusRender,
} from "@/components/ProblemSolvedStatus";

import api from "@/api";

interface ProblemTitleItem {
  id: number;
  title: string;
}

interface ProblemItem {
  status: ProblemSolvedStatus;
  id: number;
  problem: ProblemTitleItem;
  submissions: number;
  acceptance: number;
  ratio: number;
}

enum ProblemTableHeadTitle {
  status = "Status",
  id = "#",
  problemTitle = "Problem Title",
  submissions = "Submissions",
  acceptance = "Acceptance",
  ratio = "Ratio",
}

function getAcceptance(
  acceptedSubmissionCount: number,
  submissionCount: number,
): number {
  const eps = 0;
  if (submissionCount === 0) {
    return parseInt((0.0 * 100).toFixed(eps));
  } else {
    return parseInt(
      ((acceptedSubmissionCount * 100.0) / submissionCount).toFixed(eps),
    );
  }
}

const ProblemsTable: React.FC<{}> = (props) => {
  const columns: ColumnsType<ProblemItem> = [
    {
      title: ProblemTableHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: "60px",
      align: "left",
      render: ProblemStatusRender,
    },
    {
      title: ProblemTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "60px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: ProblemTableHeadTitle.problemTitle,
      dataIndex: "problem",
      key: "problem",
      width: "540px",
      align: "left",
      render: (problem: ProblemTitleItem) => {
        return (
          <Tooltip placement="top" title={problem.title}>
            <a
              href={`/problem/${problem.id}`}
              className={["h-ellipsis"].join(" ")}
            >
              {problem.title}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ProblemTableHeadTitle.acceptance,
      dataIndex: "acceptance",
      key: "acceptance",
      width: "80px",
      align: "right",
      sorter: (a, b) => a.acceptance - b.acceptance,
    },
    {
      title: ProblemTableHeadTitle.submissions,
      dataIndex: "submissions",
      key: "submissions",
      width: "100px",
      align: "right",
      sorter: (a, b) => a.submissions - b.submissions,
    },
    {
      title: ProblemTableHeadTitle.ratio,
      dataIndex: "ratio",
      key: "ratio",
      width: "60px",
      align: "right",
      sorter: (a, b) => a.ratio - b.ratio,
      render: (ratio: number) => <span>{ratio}%</span>,
    },
  ];

  const [tableData, setTableData] = useState([] as ProblemItem[]);

  const [fetchDataLoaded, setFetchDataLoaded] = useState(false);
  async function fetchData() {
    const { requestError, response } = await api.problem.queryProblemSet({
      locale: "en_US",
      skipCount: 0,
      takeCount: 1000000,
      nonpublic: false,
      titleOnly: false,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(requestError);
    } else {
      let _tableData: ProblemItem[] = [];
      response.result.forEach((item) => {
        _tableData.push({
          status: getStatus(item),
          id: item.meta.id,
          problem: {
            id: item.meta.id,
            title: item.title,
          } as ProblemTitleItem,
          acceptance: item.meta.acceptedSubmissionCount,
          submissions: item.meta.submissionCount,
          ratio: getAcceptance(
            item.meta.acceptedSubmissionCount,
            item.meta.submissionCount,
          ),
        });
      });
      setTableData(_tableData);
      setFetchDataLoaded(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.tableRoot}>
      <Table<ProblemItem>
        loading={!fetchDataLoaded}
        size="small"
        scroll={{ x: 1000 }}
        sticky
        columns={columns}
        dataSource={tableData}
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
  );
};

export default ProblemsTable;
