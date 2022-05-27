import React, { useEffect, useState } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
import { Button, message, Space, Popconfirm, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import style from "./JudgeMachinePage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import copyToClipboard from "@/utils/copyToClipboard";
import { AddJudgeMachineModel } from "./components";

import { useTableSearch, useTableFilter } from "@/utils/hooks";

import api from "@/api";

import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";

const DeleteIcon = () => (
  <DeleteOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

const KeyIcon = () => (
  <KeyOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

type statusType = "online" | "offline";

function renderStatusBadge(status: statusType) {
  const _status = status === "online" ? true : false;
  return (
    <>
      <div
        className={`${style.statusBadge} ${
          _status ? style.online : style.offline
        }`}
      ></div>
      {_status ? "ON" : "OFF"}
    </>
  );
}

interface JudgeClientSystemInfo {
  os: string;
  kernel: string;
  arch: string;
  cpu: {
    model: string;
    flags: string;
    cache: Record<string, number>;
  };
  memory: {
    size: number;
    description: string;
  };
  languages: {};
  extraInfo: string;
}

interface actionItem {
  id: number;
  key: string;
}

interface JudgeMachineItem {
  id: number;
  status: statusType;
  name: string;
  cpu: ApiTypes.JudgeClientInfoDto;
  memory: string;
  os: string;
  kernal: string;
  action: actionItem;
}

enum JudgeMachineHeadTitle {
  id = "#",
  status = "Status",
  name = "Name",
  cpu = "CPU",
  memory = "Memory",
  os = "OS",
  kernal = "Kernel",
  action = "Action",
}

const JudgeMachinePage: React.FC<{}> = (props) => {
  const [addJudgeMachineModalVisible, setAddJudgeMachineModalVisible] =
    useState(false);
  const [tableData, setTableData] = useState([]);

  function getCpu(judgeClient: ApiTypes.JudgeClientInfoDto) {
    if (judgeClient.systemInfo && judgeClient.systemInfo) {
      const systemInfo = judgeClient.systemInfo as JudgeClientSystemInfo;
      const hasFlags = !!systemInfo.cpu.flags;
      const hasCache =
        systemInfo.cpu.cache &&
        typeof systemInfo.cpu.cache === "object" &&
        Object.keys(systemInfo.cpu.cache).length !== 0;

      if (!hasFlags && !hasCache) return systemInfo.cpu.model;

      const content = (
        <>
          {hasFlags && (
            <>
              <h2>Flags</h2>
              <p className={style.cpuFlags}>{systemInfo.cpu.flags}</p>
            </>
          )}
          {hasCache && (
            <>
              <h2>Cache</h2>
              <table className={style.cpuCache}>
                <tbody>
                  {Object.entries(systemInfo.cpu.cache).map(([name, value]) => (
                    <tr key={name}>
                      <td align="left" className={style.cpuCacheName}>
                        <strong>{name}</strong>
                      </td>
                      <td>{Math.round(value / 1024) + " KiB"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      );

      return (
        <Popover content={content} placement={"bottom"}>
          <span>{systemInfo.cpu.model}</span>
        </Popover>
      );
    }
    return "-";
  }

  function getMemory(judgeClient: ApiTypes.JudgeClientInfoDto) {
    if (judgeClient.systemInfo && judgeClient.systemInfo) {
      const systemInfo = judgeClient.systemInfo as JudgeClientSystemInfo;
      return (
        systemInfo.memory.description +
        " (" +
        Math.round(systemInfo.memory.size / 1024) +
        " MiB)"
      );
    }
    return "-";
  }

  function getKernel(judgeClient: ApiTypes.JudgeClientInfoDto) {
    if (judgeClient.systemInfo && judgeClient.systemInfo) {
      const systemInfo = judgeClient.systemInfo as JudgeClientSystemInfo;
      return systemInfo.kernel;
    }
    return "-";
  }

  function getOS(judgeClient: ApiTypes.JudgeClientInfoDto) {
    if (judgeClient.systemInfo && judgeClient.systemInfo) {
      const systemInfo = judgeClient.systemInfo as JudgeClientSystemInfo;
      return systemInfo.os;
    }
    return "-";
  }

  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchDate() {
    const { requestError, response } = await api.judgeClient.listJudgeClients();

    let _tableData: JudgeMachineItem[] = [];
    if (requestError) {
      message.error(requestError);
    } else {
      response.judgeClients.forEach((item) => {
        _tableData.push({
          id: item.id,
          name: item.name,
          cpu: item,
          memory: getMemory(item),
          os: getOS(item),
          kernal: getKernel(item),
          status: item.online ? "online" : "offline",
          action: {
            id: item.id,
            key: item.key,
          },
        });
      });
      setTableData(_tableData);
      setFetchDataLoading(false);
    }
  }

  const [deleteLoading, setDeleteLoading] = useState(false);
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

  useEffect(() => {
    fetchDate();
  }, [addJudgeMachineModalVisible, deleteLoading]);

  const columns: ColumnsType<JudgeMachineItem> = [
    {
      title: JudgeMachineHeadTitle.status,
      dataIndex: "status",
      key: "status",
      width: 80,
      align: "left",
      ...useTableFilter(
        "status",
        JudgeMachineHeadTitle.status,
        ["online", "offline"].map((status: statusType) => {
          return {
            title: renderStatusBadge(status),
            value: status,
          };
        }),
        160,
      ),
      render: renderStatusBadge,
    },
    {
      title: JudgeMachineHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: 60,
      align: "left",
      ...useTableSearch("name", JudgeMachineHeadTitle.name),
    },
    {
      title: JudgeMachineHeadTitle.cpu,
      dataIndex: "cpu",
      key: "cpu",
      width: 180,
      align: "left",
      render: getCpu,
    },
    {
      title: JudgeMachineHeadTitle.memory,
      dataIndex: "memory",
      key: "memory",
      width: 120,
      align: "left",
    },
    {
      title: JudgeMachineHeadTitle.os,
      dataIndex: "os",
      key: "os",
      width: 120,
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
      width: 70,
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
              <KeyIcon />
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
              <a>
                <DeleteIcon />
              </a>
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
