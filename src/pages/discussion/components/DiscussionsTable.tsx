import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useTableSearch } from "@/utils/hooks";

import api from "@/api";

interface titleItem {
  id: number;
  name: string;
}

interface actionItem {
  id: number;
}

interface DiscussionItem {
  id: number;
  title: titleItem;
  publisher: string;
  replies: number;
  lastUpdated: string;
  action: actionItem;
}

interface DiscussionsTableProps {
  publisherId: number;
  isMe?: boolean;
}

enum DiscussionsTableHeadTitle {
  title = "Title",
  publisher = "Publisher",
  replies = "Replies",
  lastUpdated = "Last Updated",
  action = "Action",
}

const DiscussionsTable: React.FC<DiscussionsTableProps> = (props) => {
  const columns: ColumnsType<DiscussionItem> = [
    {
      title: DiscussionsTableHeadTitle.title,
      dataIndex: "title",
      key: "title",
      width: 500,
      align: "left",
      render: (title: titleItem) => {
        return <a href={`/discussion/${title.id}`}>{title.name}</a>;
      },
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

  if (props.isMe) {
    columns.push({
      title: DiscussionsTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: 180,
      align: "left",
      render: (action: actionItem) => {
        return (
          <>
            <div
              style={{
                padding: 5,
              }}
            >
              <a href={`/discussion/${action.id}/edit`}>Edit</a>
            </div>
          </>
        );
      },
    });
  }

  const [fetchLoading, setFetchLoading] = useState(true);
  const [tableData, setTableData] = useState([] as DiscussionItem[]);

  async function fetchTableData() {
    const { requestError, response } = await api.discussion.queryDiscussions({
      locale: "en_US",
      publisherId: props.publisherId ?? 0,
      nonpublic: false,
      titleOnly: false,
      skipCount: 0,
      takeCount: 0,
    });

    if (requestError) {
      message.error(requestError);
    } else {
      let _tableData: DiscussionItem[] = [];
      response.discussions.forEach((item) => {
        _tableData.push({
          id: item.meta.id,
          title: {
            id: item.meta.id,
            name: item.meta.title,
          },
          publisher: item.publisher.username,
          replies: item.meta.replyCount,
          lastUpdated: item.meta.editTime ?? item.meta.publishTime,
          action: {
            id: item.meta.id,
          },
        });
      });
      setTableData(_tableData);
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      <Table<DiscussionItem>
        loading={fetchLoading}
        size="small"
        scroll={{ x: 1180 }}
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
    </>
  );
};

export default DiscussionsTable;
