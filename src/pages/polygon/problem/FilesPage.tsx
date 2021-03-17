import React, { useState } from "react";

import ProblemLayout from "./components/ProblemLayout";

import { Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useTableSearch } from "@/utils/hooks";
import FileUploadDrawer from "@/components/FileUploadDrawer";

const FilesPage: React.FC<{}> = (props) => {
  const [FileUploadDrawerVisible, setFileUploadDrawerVisible] = useState(false);
  interface FileItem {
    name: string;
    length: number;
    modified: string;
  }

  enum FilesTableHeadTitle {
    name = "Name",
    length = "Length",
    modified = "Modified",
    action = "Action",
  }

  const columns: ColumnsType<FileItem> = [
    {
      title: FilesTableHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: "50%",
      align: "left",
      ...useTableSearch("name", FilesTableHeadTitle.name),
    },
    {
      title: FilesTableHeadTitle.length,
      dataIndex: "length",
      key: "length",
      width: "15%",
      align: "left",
      sorter: (a, b) => a.length - b.length,
    },
    {
      title: FilesTableHeadTitle.modified,
      dataIndex: "modified",
      key: "modified",
      width: "15%",
      align: "left",
      // sorter: (a, b) => a.name - b.name,
    },
    {
      title: FilesTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: "20%",
      align: "left",
    },
  ];

  return (
    <>
      <ProblemLayout current={"files"}>
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              setFileUploadDrawerVisible(true);
            }}
          >
            Add File
          </Button>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Table<FileItem>
            size="small"
            // scroll={{ x: 1100 }}
            sticky
            columns={columns}
            // dataSource={getTableDataSource()}
            className={AntTableHeadStyles.table}
            rowKey={(record) => record.name}
            pagination={{
              hideOnSinglePage: true,
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: 32,
              pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
            }}
          />
        </div>
      </ProblemLayout>

      <FileUploadDrawer
        visible={FileUploadDrawerVisible}
        onClose={() => {
          setFileUploadDrawerVisible(false);
        }}
      />
    </>
  );
};

export default FilesPage;
