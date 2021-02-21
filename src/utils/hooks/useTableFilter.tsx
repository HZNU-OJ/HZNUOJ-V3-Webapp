import React, { useState, useRef, ReactNode } from "react";
import { Space, Button, TreeSelect } from "antd";
import Highlighter from "react-highlight-words";

import { FilterOutlined } from "@ant-design/icons";

import "./useTableFilter.less";

interface TreeSelectedItem {
  title: ReactNode;
  value: string;
}

export function useTableFilter(
  dataIndex: string,
  dataName: string,
  treeData: TreeSelectedItem[],
  width: number = 227,
) {
  dataName = dataName ?? dataIndex;

  const [filterText, setFilterText] = useState("");
  const [filteredColumn, setFilteredColumn] = useState("");

  const filterInput = useRef(null);

  const { SHOW_PARENT } = TreeSelect;

  const itemSelection = (selectedKeys: any, setSelectedKeys: any) => {
    // check configuration here: https://ant.design/components/tree-select-cn/
    const tProps = {
      treeData,
      value: selectedKeys,
      defaultValue: [],
      placeholder: `Select ${dataName}`,
      autoClearSearchValue: false,
      treeCheckable: true,
      maxTagCount: 0,
      treeNodeFilterProp: "title",
      treeDefaultExpandAll: true,
      showCheckedStrategy: SHOW_PARENT,
      getPopupContainer: (triggerNode) => triggerNode.parentNode,
      className: "tree-select",
      size: "small",
      showSearch: false,
      dropdownMatchSelectWidth: width,
      dropdownClassName: "common-treeSelect-dropdown",
      onChange: (value: any) => {
        setSelectedKeys(value);
      },
    };

    return <TreeSelect ref={filterInput} {...tProps} />;
  };

  const getColumnFilterProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className={"h-table-filter-dropdown"}>
        {itemSelection(selectedKeys, setSelectedKeys)}
        <Space>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 60 }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => handleFilter(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 60 }}
          >
            OK
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FilterOutlined style={{ color: filtered ? "#fff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
      }
    },
    render: (text: any) =>
      filteredColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[filterText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleFilter = (selectedKeys: any, confirm: any, dataIndex: string) => {
    confirm();
    setFilterText(selectedKeys[0]);
    setFilteredColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setFilterText("");
  };

  return getColumnFilterProps();
}
