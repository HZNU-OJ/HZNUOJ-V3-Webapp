import React from "react";
import { ColumnsType } from "antd/es/table";
import { Table, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { useTableSearch } from "@/utils/hooks";

interface FileUploadProps {
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  interface FileItem {
    name: string;
    size: number;
    modified: string;
  }

  enum FilesTableHeadTitle {
    name = "Name",
    size = "Size",
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
      title: FilesTableHeadTitle.size,
      dataIndex: "size",
      key: "size",
      width: "15%",
      align: "left",
      sorter: (a, b) => a.size - b.size,
    },
    // {
    //   title: FilesTableHeadTitle.modified,
    //   dataIndex: "modified",
    //   key: "modified",
    //   width: "15%",
    //   align: "left",
    //   // sorter: (a, b) => a.name - b.name,
    // },
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
      <div>
        <Row gutter={16} align={"top"}>
          <Col md={12}>
            <div style={{ textAlign: "left" }}>
              <h1>{props.name}</h1>
            </div>
          </Col>
          <Col md={12}>
            <div style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={"middle"}
                onClick={() => {}}
              >
                Add File
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
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
    </>
  );
};

export default FileUpload;
