import React from "react";
import { Form, Row, Col, Input, Button, Select } from "antd";
import style from "./ProblemInfoPanel.module.less";

import {
  problemStatusEnum,
  problemTypeEnum,
  problemTypeList,
} from "@/interface/problem.interface";

const problemInfoList = [
  ["ID", "id"],
  ["Name", "name"],
  ["Type", "type"],
  ["Status", "status"],
  ["Owner", "owner"],
];

interface ProblemInfoPanelProps {
  id: string;
  name: string;
  owner: string;
  type: problemTypeEnum;
  status: problemStatusEnum;
}

const ProblemInfoPanel: React.FC<ProblemInfoPanelProps> = (props) => {
  return (
    <>
      <div className={style.infoPanel}>
        {problemInfoList.map((item, index) => (
          <Row gutter={16} key={index}>
            <Col span={5}>
              <p>
                <strong>{item[0]}:</strong>
              </p>
            </Col>
            <Col span={19}>
              <div className={"h-ellipsis"}>{props[item[1]]}</div>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default ProblemInfoPanel;
