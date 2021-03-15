import React, { useState } from "react";
import PolygonLayout from "@/layouts/PolygonLayout";
import { useTableSearch } from "@/utils/hooks";
import { Table, Button, Tooltip, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import style from "./ProblemsPage.module.less";
import { PlusOutlined } from "@ant-design/icons";

interface AddProblemModelProps {
  visible: boolean;
  confirmLoading?: any;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddProblemModel: React.FC<AddProblemModelProps> = (props) => {
  interface AddProblemFormParams {
    problemName: string;
  }

  const [form] = Form.useForm();

  async function confirmAction(value: AddProblemFormParams) {
    console.log(value);
  }

  return (
    <>
      <Modal
        title={"Add Problem"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={props.confirmLoading ?? false}
        onCancel={props.onCancel ?? (() => {})}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              form.setFieldsValue(values);
              confirmAction(values);
            })
            .catch((info) => {
              console.log("Confirm Error:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name={"ddd"}
          style={{
            width: "98%",
            margin: 5,
            marginBottom: -40,
          }}
        >
          <Form.Item>
            <Form.Item
              name="name"
              label="name"
              tooltip="The name is not the name in the statement. It is just a sign. And can be duplicate."
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

interface ProblemItem {
  id: number;
  name: string;
  owner: string;
  revision: string;
  modify: number;
}

enum ProblemTableHeadTitle {
  id = "#",
  name = "Name",
  owner = "Owner",
  revision = "Rev.",
  modify = "Modify.",
  operation = "Operation",
}

const ProblemsPage: React.FC<{}> = (props) => {
  const [addProblemModalVisible, setAddProblemModalVisible] = useState(false);

  async function onClose() {
    setAddProblemModalVisible(false);
  }

  async function onClick() {
    setAddProblemModalVisible(true);
  }

  const columns: ColumnsType<ProblemItem> = [
    {
      title: ProblemTableHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: "36px",
      align: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: ProblemTableHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: "220px",
      align: "left",
      ...useTableSearch("name", ProblemTableHeadTitle.name),
      render: (name: string) => {
        return (
          <Tooltip placement="top" title={name}>
            <a href="/polygon/problem" className={["h-ellipsis"].join(" ")}>
              {name}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: ProblemTableHeadTitle.owner,
      dataIndex: "owner",
      key: "owner",
      width: "120px",
      align: "left",
      ...useTableSearch("owner", ProblemTableHeadTitle.owner),
    },
    {
      title: ProblemTableHeadTitle.revision,
      dataIndex: "revision",
      key: "revision",
      width: "80px",
      align: "left",
    },
    {
      title: ProblemTableHeadTitle.modify,
      dataIndex: "modify",
      key: "modify",
      width: "180px",
      align: "left",
      sorter: (a, b) => a.modify - b.modify,
    },
    {
      title: ProblemTableHeadTitle.operation,
      dataIndex: "operator",
      key: "operator",
      width: "100px",
      align: "left",
    },
  ];

  return (
    <>
      <PolygonLayout current={"problem"}>
        <div className={style.root}>
          <div className={style.opBtn}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={"middle"}
              onClick={onClick}
            >
              Add Problem
            </Button>
          </div>
          <div className={style.table}>
            <Table<ProblemItem>
              size="small"
              scroll={{ x: 1100 }}
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
          </div>
        </div>
      </PolygonLayout>

      <AddProblemModel
        visible={addProblemModalVisible}
        onCancel={() => {
          setAddProblemModalVisible(false);
        }}
      />
    </>
  );
};

export default ProblemsPage;
