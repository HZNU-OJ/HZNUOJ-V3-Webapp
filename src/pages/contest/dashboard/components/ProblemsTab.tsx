import React, { useState, useEffect, useContext } from "react";
import { useParams } from "umi";
import { Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import style from "./ProblemsTab.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";

import api from "@/api";

interface ProblemTitleItem {
  orderId: string;
  title: string;
}

interface ProblemItem {
  id: number;
  problem: ProblemTitleItem;
  submissions: number;
  acceptance: string;
}

enum ProblemTableHeadTitle {
  id = "#",
  problemTitle = "Problem Title",
  submissions = "Submissions",
  acceptance = "Acceptance",
}

function getAcceptance(
  acceptedSubmissionCount: number,
  submissionCount: number,
) {
  if (submissionCount === 0) {
    return (0.0 * 100).toFixed(2);
  } else {
    return ((acceptedSubmissionCount * 100.0) / submissionCount).toFixed(2);
  }
}

export function mappingOrderIdToAlpha(orderId: number) {
  return String.fromCharCode("A".charCodeAt(0) + orderId - 1);
}

export function mappingAlphaToOrderId(alpha: string) {
  return alpha.charCodeAt(0) - "A".charCodeAt(0) + 1;
}

interface ProblemsTabParams {
  id: string;
}

const ProblemsTab: React.FC<{}> = (props) => {
  const params: ProblemsTabParams = useParams();

  const contest = useContext(ContestContext);

  const columns: ColumnsType<ProblemItem> = [
    {
      title: ProblemTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "60px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
      render: mappingOrderIdToAlpha,
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
              href={`/contest/${params.id}problem/${problem.orderId}`}
              className={["h-ellipsis"].join(" ")}
            >
              {problem.title}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ProblemTableHeadTitle.submissions,
      dataIndex: "submissions",
      key: "submissions",
      width: "120px",
      align: "right",
    },
    {
      title: ProblemTableHeadTitle.acceptance,
      dataIndex: "acceptance",
      key: "acceptance",
      width: "100px",
      align: "right",
      render: (acceptNum: number) => <span>{acceptNum}%</span>,
    },
  ];

  const [tableData, setTableData] = useState([] as ProblemItem[]);
  async function fetchData() {
    setTableData(
      contest.problemMetas.map((problem) => ({
        id: problem.orderId,
        problem: {
          orderId: mappingOrderIdToAlpha(problem.orderId),
          title: problem.title,
        } as ProblemTitleItem,
        submissions: problem.submissionCount,
        acceptance: getAcceptance(
          problem.acceptedSubmissionCount,
          problem.submissionCount,
        ),
      })),
    );
  }

  useEffect(() => {
    fetchData();
  }, [contest]);

  return (
    <div className={style.tableRoot}>
      <Table<ProblemItem>
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

export default ProblemsTab;
