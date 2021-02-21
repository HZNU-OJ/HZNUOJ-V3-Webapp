import React, { useState, useEffect, useRef } from "react";
import { Input, Space, Button, TreeSelect } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { FilterOutlined } from "@ant-design/icons";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export function useTableFilter(dataIndex: string, dataName?: string) {
  dataName = dataName ?? dataIndex;

  const [selectedKeys, setSelectedKeys] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // treeSelect Component => Use treeData to generate a tree structure from JSON data.
  const itemSelection = (
    treeData: any,
    dataIndex: any,
    selectedKeys: any,
    setSelectedKeys: any,
  ) => {
    // Check the configuration here: https://ant.design/components/tree-select-cn/
    const tProps = {
      treeData,
      value: selectedKeys,
      defaultValue: [],
      placeholder: `Select ${dataIndex}`,
      autoClearSearchValue: false,
      treeCheckable: true,
      maxTagCount: 0,
      treeNodeFilterProp: "title",
      treeDefaultExpandAll: true,
      showCheckedStrategy: SHOW_PARENT,
      getPopupContainer: (triggerNode) => triggerNode.parentNode,
      size: "small",
      className: "tree-select",
      dropdownMatchSelectWidth: 217,
      dropdownClassName: "common-treeSelect-dropdown",
      onChange: (value: any) => {
        setSelectedKeys(value);
      },
    };

    return <TreeSelect {...tProps} />;
  };

  const getColumnSearchProps = (dataIndex: string, dataName: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataName}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#fff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[selectedKeys]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: string) => {
    confirm();
    setSelectedKeys(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSelectedKeys("");
  };

  return getColumnSearchProps(dataIndex, dataName);
}
