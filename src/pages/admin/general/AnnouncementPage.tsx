import React, { useEffect, useState, useRef, useCallback } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
import { Button, message, Space, Popconfirm, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import style from "./AnnouncementPage.module.less";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTableSearch } from "@/utils/hooks";
import FormatTableDate from "@/components/FormatTableDate";
import { AddAnnouncementModel } from "./components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
const type = "DragableBodyRow";

import api from "@/api";

import { DeleteOutlined } from "@ant-design/icons";

const DeleteIcon = () => (
  <DeleteOutlined style={{ cursor: "pointer", color: "#3e90cc" }} />
);

interface ActionItem {
  id: number;
}

interface TitleItem {
  id: number;
  title: string;
}

interface AnnouncementItem {
  id: number;
  title: TitleItem;
  lastUpdateTime: Date;
  orderId: number;
  action: ActionItem;
}

enum AnnouncementHeadTitle {
  id = "#",
  title = "Title",
  lastUpdateTime = "Date",
  action = "Action",
}

const AnnouncementPage: React.FC<{}> = (props) => {
  const [
    addAnnouncementModelVisible,
    setAddAnnouncementModelVisible,
  ] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [fetchDataLoading, setFetchDataLoading] = useState(true);
  async function fetchDate() {
    const { requestError, response } = await api.homepage.getAnnouncements();

    if (requestError) {
      message.error(requestError);
    } else {
      setTableData(
        response.announcementMetas.map((announcement) => ({
          id: announcement.id,
          title: {
            id: announcement.discussionId,
            title: announcement.title,
          },
          lastUpdateTime: announcement.lastUpdateTime,
          orderId: announcement.orderId,
          action: {
            id: announcement.id,
          },
        })),
      );
      setFetchDataLoading(false);
    }
  }

  const [deleteLoading, setDeleteLoading] = useState(false);
  async function onDelete(id: number) {
    setDeleteLoading(true);
    const { requestError, response } = await api.homepage.deleteAnnouncement({
      announcementId: id,
    });
    if (requestError) {
      message.error(requestError);
    } else if (response.error) {
      message.error(response.error);
    } else {
      message.success(`Delete Announcement(${id}) Successfully!`);
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    fetchDate();
  }, [addAnnouncementModelVisible, deleteLoading]);

  const columns: ColumnsType<AnnouncementItem> = [
    {
      title: AnnouncementHeadTitle.id,
      dataIndex: "id",
      key: "id",
      width: 40,
      align: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: AnnouncementHeadTitle.title,
      dataIndex: "title",
      key: "title",
      width: 480,
      align: "left",
      ...useTableSearch("title", AnnouncementHeadTitle.title),
      render: (titleItem: TitleItem) => {
        return (
          <Tooltip placement="top" title={titleItem.title}>
            <a
              href={`/discussion/${titleItem.id}`}
              className={["h-ellipsis"].join(" ")}
              target={"_blank"}
            >
              {titleItem.title}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: AnnouncementHeadTitle.lastUpdateTime,
      dataIndex: "lastUpdateTime",
      key: "lastUpdateTime",
      width: 120,
      align: "left",
      sorter: (a, b) => {
        if (a.lastUpdateTime < b.lastUpdateTime) return -1;
        if (a.lastUpdateTime > b.lastUpdateTime) return 1;
      },
      render: (lastUpdateTime: Date) => (
        <FormatTableDate date={lastUpdateTime} />
      ),
    },
    {
      title: AnnouncementHeadTitle.action,
      dataIndex: "action",
      key: "action",
      width: 70,
      align: "left",
      render: (action: ActionItem) => {
        return (
          <Space size={"middle"}>
            <Popconfirm
              title={`Are you sure to delete the announcement?`}
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

  const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop(
      () => ({
        accept: type,
        collect: (monitor) => {
          const { index: dragIndex } = monitor.getItem() || {};
          if (dragIndex === index) {
            return {};
          }
          return {
            isOver: monitor.isOver(),
            dropClassName:
              dragIndex < index ? " drop-over-downward" : " drop-over-upward",
          };
        },
        drop: (item) => {
          moveRow(item.index, index);
        },
      }),
      [index],
    );
    const [, drag] = useDrag(
      () => ({
        type,
        item: { index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [index],
    );
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const [swapLoading, setSwapLoading] = useState(false);
  const moveRow = useCallback(
    async (dragIndex, hoverIndex) => {
      const dragRow = tableData[dragIndex];
      const _data = update(tableData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setTableData(_data);
      setSwapLoading(true);

      const orginId = tableData[dragIndex].id;
      const newId = tableData[hoverIndex].id;

      const {
        requestError,
        response,
      } = await api.homepage.swapTwoAnnouncementOrder({
        announcementOrginId: orginId,
        announcementNewId: newId,
      });

      if (requestError) {
        message.error(requestError);
      } else if (response.error) {
        message.error(response.error);
      } else {
        message.success(
          `Swap Announcement ${orginId} and Announcement ${newId} Successfully.`,
        );
      }
      setSwapLoading(false);
    },
    [tableData],
  );

  return (
    <>
      <GeneralLayout current={"announcement"}>
        <div className={style.addBtn}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={() => {
              setAddAnnouncementModelVisible(true);
            }}
          >
            Add Announcement
          </Button>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className={style.table}>
            <Table<AnnouncementItem>
              size="small"
              scroll={{ x: 900 }}
              sticky
              loading={fetchDataLoading || swapLoading}
              columns={columns}
              dataSource={tableData}
              className={AntTableHeadStyles.table}
              rowKey={(record) => record.id}
              components={components}
              onRow={(record, index) => ({
                index,
                moveRow,
              })}
              pagination={{
                hideOnSinglePage: true,
                showQuickJumper: true,
                showSizeChanger: true,
                defaultPageSize: 32,
                pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
              }}
            />
          </div>
        </DndProvider>
      </GeneralLayout>

      <AddAnnouncementModel
        visible={addAnnouncementModelVisible}
        onCancel={() => setAddAnnouncementModelVisible(false)}
      />
    </>
  );
};

export default AnnouncementPage;
