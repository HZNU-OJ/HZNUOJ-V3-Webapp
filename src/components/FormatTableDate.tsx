import React from "react";
import { Tooltip } from "antd";
import { formatDateTime } from "@/utils/formatDateTime";

interface FormatTableDateProps {
  date: string | number | Date;
}

const FormatTableDate: React.FC<FormatTableDateProps> = (props) => {
  const [withoutYear, withYear] = formatDateTime(props.date);
  return (
    <Tooltip placement="top" title={withYear}>
      <span>{withoutYear}</span>
    </Tooltip>
  );
};

export default FormatTableDate;
