import React, { useEffect, useState } from "react";
import GeneralLayout from "./components/GeneralLayout";
import { Button, Form, Modal, Input, message, Space, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import style from "./JudgeMachinePage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTableSearch } from "@/utils/hooks";
import copyToClipboard from "@/utils/copyToClipboard";

import api from "@/api";

interface AddJudgeMachineModelProps {
  visible: boolean;
  confirmLoading?: any;
  title?: string;
  onOk?: any;
  onCancel?: any;
}

const AddJudgeMachineModel: React.FC<AddJudgeMachineModelProps> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  interface AddJudgeMachineParams {
    name: string;
  }

  const [form] = Form.useForm();

  async function confirmAction(value: AddJudgeMachineParams) {
    setConfirmLoading(true);

    const { requestError, response } = await api.judgeClient.addJudgeClient({
      name: value.name,
      allowedHosts: [],
    });

    if (response?.error) {
      message.error(response.error);
    } else {
      message.success("Add Sucessfully!");
      if (props.onCancel) {
        props.onCancel();
      }
    }

    setConfirmLoading(false);
  }

  return (
    <>
      <Modal
        title={"Add Judge Machine"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        confirmLoading={props.confirmLoading || confirmLoading}
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
          style={{
            width: "98%",
            margin: 5,
            marginBottom: -40,
          }}
        >
          <Form.Item>
            <Form.Item
              name="name"
              label="Name"
              tooltip="The Judge Machine Name."
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

interface actionItem {
  id: number;
  key: string;
}

interface JudgeMachineItem {
  id: number;
  status: boolean;
  name: string;
  cpu: string;
  memory: string;
  kernal: string;
  action: actionItem;
}

enum JudgeMachineHeadTitle {
  id = "#",
  status = "Status",
  name = "Name",
  cpu = "CPU",
  memory = "Memory",
  kernal = "Kernel",
  action = "Action",
}

const JudgeMachinePage: React.FC<{}> = (props) => {
  const [
    addJudgeMachineModalVisible,
    setAddJudgeMachineModalVisible,
  ] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchDate() {
    const { requestError, response } = await api.judgeClient.listJudgeClients();

    let _tableData = [];
    if (requestError) {
      message.error(requestError);
    } else {
      response.judgeClients.forEach((item) => {
        _tableData.push({
          id: item.id,
          name: item.name,
          cpu: "",
          memory: "",
          kernal: "",
          action: {
            id: item.id,
            key: item.key,
          },
        });
      });
      console.log(response);
      setTableData(_tableData);
      setFetchDataLoading(false);
    }
  }

  useEffect(() => {
    fetchDate();
  }, [addJudgeMachineModalVisible, deleteLoading]);

  async function onDelete(id: number) {
    setDeleteLoading(true);
    const { requestError, response } = await api.judgeClient.deleteJudgeClient({
      id,
    });
    if (requestError) message.error(requestError);
    else if (response.error) message.error(response.error);
    else {
      message.success(`Delete Judge Machine(${id}) Successfully!`);
    }
    setDeleteLoading(false);
  }

  const columns: ColumnsType<JudgeMachineItem> = [
    {
      title: JudgeMachineHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "left",
      render: (status: boolean) => {
        return (
          <>
            <div
              className={`${style.statusBadge} ${
                status ? style.online : style.offline
              }`}
            ></div>
            {status ? "Online" : "Offline"}
          </>
        );
      },
    },
    {
      title: JudgeMachineHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: 100,
      align: "left",
      ...useTableSearch("name", JudgeMachineHeadTitle.name),
    },
    {
      title: JudgeMachineHeadTitle.cpu,
      dataIndex: "cpu",
      key: "cpu",
      width: 200,
      align: "left",
    },
    {
      title: JudgeMachineHeadTitle.memory,
      dataIndex: "memory",
      key: "memory",
      width: 200,
      align: "left",
    },
    {
      title: JudgeMachineHeadTitle.kernal,
      dataIndex: "kernal",
      key: "kernal",
      width: 120,
      align: "left",
    },
    {
      title: JudgeMachineHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: 100,
      align: "left",
      render: (action: actionItem) => {
        return (
          <Space size={"middle"}>
            <a
              onClick={() => {
                copyToClipboard(action.key);
                message.success("Copied!");
              }}
            >
              Key
            </a>
            <Popconfirm
              title={`Are you sure to delete the judge machine?`}
              onConfirm={() => {
                onDelete(action.id);
              }}
              okText="Yes"
              cancelText="No"
              placement="top"
              okButtonProps={{
                loading: deleteLoading,
              }}
            >
              <a>Del</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <GeneralLayout current={"judgeMachine"}>
        <div className={style.addBtn}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              setAddJudgeMachineModalVisible(true);
            }}
          >
            Add Judge Machine
          </Button>
        </div>

        <div className={style.table}>
          <Table<JudgeMachineItem>
            size="small"
            scroll={{ x: 880 }}
            sticky
            loading={fetchDataLoading}
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
      </GeneralLayout>

      <AddJudgeMachineModel
        visible={addJudgeMachineModalVisible}
        onCancel={() => {
          setAddJudgeMachineModalVisible(false);
        }}
      />
    </>
  );
};

export default JudgeMachinePage;
