import React, { useState, useEffect, useContext } from "react";
import { useParams } from "umi";
import { Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import style from "./ProblemsTab.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { ContestContext } from "@/pages/contest/layouts/ContestLayout";
import { mappingOrderIdToAlphaId } from "@/pages/contest/utils";

interface ProblemTitleItem {
  orderId: string;
  title: string;
}

interface ProblemItem {
  id: number;
  problem: ProblemTitleItem;
  submissions: number;
  acceptance: number;
  ratio: number;
}

enum ProblemTableHeadTitle {
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
      render: mappingOrderIdToAlphaId,
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
              href={`/contest/${params.id}/problem/${problem.orderId}`}
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
  async function fetchData() {
    setTableData(
      contest.problemMetas.map((problem) => ({
        id: problem.orderId,
        problem: {
          orderId: mappingOrderIdToAlphaId(problem.orderId),
          title: problem.title,
        } as ProblemTitleItem,
        acceptance: problem.acceptedSubmissionCount,
        submissions: problem.submissionCount,
        ratio: getAcceptance(
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
