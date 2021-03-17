import React from "react";
import ProblemLayout from "./components/ProblemLayout";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTableSearch, useTableFilter } from "@/utils/hooks";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

const SolutionsPage: React.FC<{}> = (props) => {
  interface SolutionItem {}

  enum SolutionsTableHeadTitle {
    author = "Author",
    name = "Name",
    language = "Language",
    length = "Length",
    modified = "Modified",
    type = "Type",
    actions = "Actions",
  }

  const columns: ColumnsType<SolutionItem> = [
    {
      title: SolutionsTableHeadTitle.author,
      dataIndex: "author",
      key: "author",
      width: "20%",
      align: "left",
      ...useTableSearch("author", SolutionsTableHeadTitle.author),
    },
    {
      title: SolutionsTableHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: "20%",
      align: "left",
      ...useTableSearch("name", SolutionsTableHeadTitle.name),
    },
    {
      title: SolutionsTableHeadTitle.language,
      dataIndex: "language",
      key: "language",
      width: "20%",
      align: "left",
      ...useTableFilter(
        "language",
        SolutionsTableHeadTitle.language,
        ["Cpp", "Java", "Python"].map((item) => ({
          title: item,
          value: item,
        })),
        160,
      ),
    },
    {
      title: SolutionsTableHeadTitle.modified,
      dataIndex: "modified",
      key: "modified",
      width: "20%",
      align: "left",
    },
    {
      title: SolutionsTableHeadTitle.type,
      dataIndex: "type",
      key: "type",
      width: "10%",
      align: "left",
    },
    {
      title: SolutionsTableHeadTitle.actions,
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      align: "left",
    },
  ];

  return (
    <ProblemLayout current={"solutions"}>
      <Table<SolutionItem>
        size="small"
        // scroll={{ x: 1100 }}
        sticky
        columns={columns}
        // dataSource={getTableDataSource()}
        className={AntTableHeadStyles.table}
        // rowKey={(record) => record.name}
        pagination={{
          hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: 32,
          pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
        }}
      />
    </ProblemLayout>
  );
};

export default SolutionsPage;
