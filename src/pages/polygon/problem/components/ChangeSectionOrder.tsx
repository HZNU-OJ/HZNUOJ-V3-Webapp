import React, { useState, useCallback, useRef, useEffect } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
const type = "DragableBodyRow";
import AntTableHeadStyles from "@/less/AntTableHead.module.less";

interface DragSortingTableProps {
  orderList: number[];
  setOrderList: (orderList: number[]) => void;
  contentSections: ApiTypes.ProblemContentSectionDto[];
}

const DragSortingTable: React.FC<DragSortingTableProps> = (props) => {
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

  interface DragItem {
    id: number;
    sectionName: string;
  }

  const columns: ColumnsType<DragItem> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      align: "left",
      width: "50px",
    },
    {
      title: "Section Name",
      dataIndex: "sectionName",
      key: "sectionName",
      align: "center",
      width: "300px",
    },
  ];

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const [data, setData] = useState([] as DragItem[]);

  useEffect(() => {
    let _data = [];
    props.orderList.forEach((order: number) => {
      _data.push({
        id: order,
        sectionName: props.contentSections[order].sectionTitle,
      });
    });
    setData(_data);
  }, [props.orderList, props.contentSections]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      const _data = update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setData(_data);
      let _orderList: number[] = [];
      _data.forEach((dragItem: DragItem) => {
        _orderList.push(dragItem.id);
      });
      props.setOrderList(_orderList);
    },
    [data],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ fontWeight: "bold" }}>
        <Table<DragItem>
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          components={components}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
          size="small"
          className={AntTableHeadStyles.table}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 16,
            pageSizeOptions: ["8", "16", "32", "64", "128", "256"],
          }}
        />
      </div>
    </DndProvider>
  );
};

import { Modal } from "antd";

interface ChangeSectionOrderModelProps {
  visible: boolean;
  onCancel: any;
  orderList: number[];
  setOrderList: (orderList: number[]) => void;
  contentSections: ApiTypes.ProblemContentSectionDto[];
}

const ChangeSectionOrderModel: React.FC<ChangeSectionOrderModelProps> = (
  props,
) => {
  const [orderList, setOrderList] = useState([] as number[]);
  async function onOk() {
    props.setOrderList(orderList);
    props.onCancel();
  }

  useEffect(() => {
    setOrderList(props.orderList);
  }, [props.orderList]);

  return (
    <>
      <Modal
        title={"Change Section Order"}
        okText={"Submit"}
        cancelText={"Cancel"}
        getContainer={false}
        maskClosable={true}
        destroyOnClose={true}
        visible={props.visible}
        onOk={onOk}
        onCancel={props.onCancel}
        bodyStyle={{
          padding: "10px",
        }}
        width={480}
      >
        <DragSortingTable
          orderList={orderList}
          setOrderList={setOrderList}
          contentSections={props.contentSections}
        />
      </Modal>
    </>
  );
};

export { DragSortingTable };
export default ChangeSectionOrderModel;
