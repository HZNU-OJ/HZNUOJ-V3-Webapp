import React, { useState } from "react";
import { Popconfirm } from "antd";

interface DeleteProblemPopProps {
  id: number;
  name?: string;
}

const DeleteProblemPop: React.FC<DeleteProblemPopProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onDelete(id: number, name?: string) {}

  return (
    <Popconfirm
      title={`Are you sure to delete the problem?`}
      onConfirm={() => {
        onDelete(props.id, props.name);
      }}
      okText="Yes"
      cancelText="No"
      placement="top"
      visible={visible}
      okButtonProps={{
        loading: loading,
      }}
    >
      <a
        onClick={() => {
          setVisible(true);
        }}
      >
        Del
      </a>
    </Popconfirm>
  );
};

export default DeleteProblemPop;
