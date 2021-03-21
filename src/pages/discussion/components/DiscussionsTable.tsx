import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useTableSearch } from "@/utils/hooks";

interface DiscussionItem {
  id: number;
  title: string;
  publisher: string;
  replies: number;
  lastUpdated: string;
}

enum DiscussionsTableHeadTitle {
  title = "Title",
  publisher = "Publisher",
  replies = "Replies",
  lastUpdated = "Last Updated",
}

const DiscussionsTable: React.FC<{}> = (props) => {
  const columns: ColumnsType<DiscussionItem> = [
    {
      title: DiscussionsTableHeadTitle.title,
      dataIndex: "title",
      key: "title",
      width: 680,
      align: "left",
      ...useTableSearch("title", DiscussionsTableHeadTitle.title),
    },
    {
      title: DiscussionsTableHeadTitle.publisher,
      dataIndex: "publisher",
      key: "publisher",
      width: 180,
      align: "center",
      ...useTableSearch("publisher", DiscussionsTableHeadTitle.publisher),
    },
    {
      title: DiscussionsTableHeadTitle.replies,
      dataIndex: "replies",
      key: "replies",
      width: 100,
      align: "center",
      sorter: (a, b) => a.replies - b.replies,
    },
    {
      title: DiscussionsTableHeadTitle.lastUpdated,
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      width: 220,
      align: "center",
    },
  ];

  return (
    <>
      <Table<DiscussionItem>
        size="small"
        scroll={{ x: 1180 }}
        sticky
        columns={columns}
        // dataSource={getTableDataSource()}
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
    </>
  );
};

export default DiscussionsTable;
