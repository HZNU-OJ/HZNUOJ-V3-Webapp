import React, { useEffect, useState } from "react";
import PolygonLayout from "@/layouts/PolygonLayout";
import { useTableSearch, useTableFilter } from "@/utils/hooks";
import { Table, Button, Tooltip, message, Space, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import style from "./ProblemsPage.module.less";
import { PlusOutlined } from "@ant-design/icons";
import AddProblemModel from "./components/AddProblemModel";
import {
  problemTypeEnum,
  problemTypeList,
} from "@/interface/problem.interface";

import api from "@/api";

interface ProblemActionParams {
  id: number;
  name?: string;
}
interface ProblemItem {
  id: number;
  name: string;
  type: problemTypeEnum;
  owner?: string;
  revision?: string;
  modify?: number;
  action: ProblemActionParams;
}

enum ProblemTableHeadTitle {
  id = "#",
  name = "Name",
  type = "Type",
  owner = "Owner",
  revision = "Rev.",
  modify = "Modify.",
  action = "Action",
}

const ProblemsPage: React.FC<{}> = (props) => {
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  const [addProblemModelVisible, setAddProblemModelVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const [tableData, setTableData] = useState([] as ProblemItem[]);

  async function onClick() {
    setAddProblemModelVisible(true);
  }

  async function fetchData() {
    const { requestError, response } = await api.problem.queryProblemSet({
      locale: "en_US",
      skipCount: 0,
      takeCount: 1000000,
      nonpublic: true,
      titleOnly: true,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(requestError);
    } else {
      let _tableData: ProblemItem[] = [];
      response.result = response.result.sort((a, b) => b.meta.id - a.meta.id);
      response.result.forEach((item) => {
        _tableData.push({
          id: item.meta.id,
          name: item.title,
          type: item.meta.type,
          action: {
            id: item.meta.id,
            name: item.title,
          },
        });
      });
      setTableData(_tableData);
      setFetchDataLoading(false);
    }
  }

  const [deleteLoading, setDeleteLoading] = useState(false);
  async function onDelete(id: number, name: string = "") {
    setDeleteLoading(true);

    const { requestError, response } = await api.problem.deleteProblem({
      problemId: id,
    });

    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(requestError);
    } else {
      message.success(
        `Problem${name === "" ? "" : `(${name})`} deleted successfully!`,
      );
    }

    setDeleteLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [addProblemModelVisible, deleteLoading]);

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
      title: ProblemTableHeadTitle.name,
      dataIndex: "name",
      key: "name",
      width: "600px",
      align: "left",
      ...useTableSearch("name", ProblemTableHeadTitle.name),
      render: (name: string) => {
        return (
          <Tooltip placement="top" title={name}>
            <div className={"h-ellipsis"}>{name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: ProblemTableHeadTitle.type,
      dataIndex: "type",
      key: "type",
      width: "200px",
      align: "left",
      ...useTableFilter(
        "type",
        ProblemTableHeadTitle.type,
        problemTypeList.map((type: string) => {
          return {
            title: <b>{type}</b>,
            value: type,
          };
        }),
        160,
      ),
    },
    // {
    //   title: ProblemTableHeadTitle.owner,
    //   dataIndex: "owner",
    //   key: "owner",
    //   width: "120px",
    //   align: "left",
    //   ...useTableSearch("owner", ProblemTableHeadTitle.owner),
    // },
    // {
    //   title: ProblemTableHeadTitle.revision,
    //   dataIndex: "revision",
    //   key: "revision",
    //   width: "80px",
    //   align: "left",
    // },
    // {
    //   title: ProblemTableHeadTitle.modify,
    //   dataIndex: "modify",
    //   key: "modify",
    //   width: "180px",
    //   align: "left",
    //   sorter: (a, b) => a.modify - b.modify,
    // },
    {
      title: ProblemTableHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: "200px",
      align: "left",
      render: (problemActionItem: ProblemActionParams) => {
        return (
          <Space size={"middle"}>
            <a href={`/polygon/problem/${problemActionItem.id}`}>Edit</a>
            <Popconfirm
              title={`Are you sure to delete the problem?`}
              onConfirm={() => {
                onDelete(problemActionItem.id, problemActionItem.name);
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
      <PolygonLayout current={"problem"}>
        <div className={style.root}>
          <div className={style.addBtn}>
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
              loading={fetchDataLoading}
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
        </div>
      </PolygonLayout>

      <AddProblemModel
        visible={addProblemModelVisible}
        onCancel={() => {
          setAddProblemModelVisible(false);
        }}
      />
    </>
  );
};

export default ProblemsPage;
