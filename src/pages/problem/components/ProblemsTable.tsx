import React, { useState, useEffect } from "react";
import { Table, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import style from "./ProblemsTable.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import api from "@/api";

interface ProblemTitleItem {
  id: number;
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

const ProblemsTable: React.FC<{}> = (props) => {
  const columns: ColumnsType<ProblemItem> = [
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
          id: item.meta.id,
          problem: {
            id: item.meta.id,
            title: item.title,
          } as ProblemTitleItem,
          submissions: item.meta.submissionCount,
          acceptance: getAcceptance(
            item.meta.acceptedSubmissionCount,
            item.meta.submissionCount,
          ),
        });
      });
      setTableData(_tableData);
    }
    setFetchDataLoaded(true);
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
