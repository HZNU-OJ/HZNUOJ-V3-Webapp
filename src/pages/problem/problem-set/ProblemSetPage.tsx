import React, { useState, useEffect } from "react";

import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/Basic";

import style from "./ProblemSetPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

import { useTableSearch } from "@/utils/hooks";

interface ProblemItem {
  id: number;
  problem: string;
  submissions: number;
  acceptance: number;
}

enum ProblemTableHeadTitle {
  id = "#",
  problem = "Problem",
  submissions = "Submissions",
  acceptance = "Acceptance",
}

function getTableDataSource(): ProblemItem[] {
  const dataSource: ProblemItem[] = [];
  for (let i = 1; i <= 100; ++i) {
    dataSource.push({
      id: i,
      problem: "A + B Problem",
      submissions: i * 1000,
      acceptance: (i * 367) % 10000,
    });
  }
  return dataSource;
}

const ProblemSetPage: React.FC<{}> = (props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
      title: ProblemTableHeadTitle.problem,
      dataIndex: "problem",
      key: "problem",
      width: "540px",
      align: "left",
      ...useTableSearch("problem", ProblemTableHeadTitle.problem),
      render: (problem: string) => {
        return (
          <Tooltip placement="top" title={problem}>
            <a href="/" className={["h-ellipsis"].join(" ")}>
              {problem}
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
      render: (acceptance: number) => {
        return `${acceptance / 100}%`;
      },
    },
  ];

  return (
    <BasicLayout current={"problemSet"}>
      <div className={style.root}>
        {loaded === false && (
          <div className={style.loading}>
            <Loading />
          </div>
        )}

        {loaded === true && (
          <div className={style.tableRoot}>
            <Table<ProblemItem>
              size="small"
              scroll={{ x: 1000 }}
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

export default ProblemSetPage;
