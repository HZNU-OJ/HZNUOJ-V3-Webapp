import React from "react";
import { useParams } from "umi";
import { Row, Col, Statistic } from "antd";

import BasicLayout from "@/layouts/BasicLayout";

import style from "./ProblemViewPage.module.less";

import SiderMenu from "@/components/SiderMenu";

import { menuItem } from "@/interface/Menu.interface";

const title = "Database optimization";
const clock = 2000;
const memory = 512;

const SiderMenuItemList: menuItem[] = [
  {
    id: "statement",
    name: "Statement",
    link: "",
  },
  {
    id: "submit",
    name: "Submit",
    link: "",
  },
  {
    id: "submissions",
    name: "Submissions",
    link: "",
  },
  {
    id: "statistics",
    name: "Statistics",
    link: "",
  },
];

interface ProblemViewPageParams {
  id: string;
}

const ProblemViewPage: React.FC<{}> = (props) => {
  const params: ProblemViewPageParams = useParams();

  return (
    <>
      <BasicLayout current={"problem_set"}>
        <div className={style.root}>
          <div className={style.problemHeader}>
            <Row gutter={16} align="top">
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <div className={style.left}>
                  <div className={style.problemTitle}>
                    {`#${params.id}. ${title}`}
                  </div>
                  <div className={[style.tag, style.time].join(" ")}>
                    {clock} ms
                  </div>
                  <div className={[style.tag, style.memory].join(" ")}>
                    {memory} MiB
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Row gutter={16} align="top">
                  <Col span={12}>
                    <Statistic title="AC." value={1223} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="SUBS." value={256999} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={style.divider}></div>

          <Row gutter={16} align="top">
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 19, order: 1 }}
              xl={{ span: 19, order: 1 }}
            >
              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div
                  className="am-panel-hd"
                  style={{ padding: "2px 5px", fontSize: 16 }}
                >
                  Description
                </div>
                <div className="am-panel-bd" style={{ padding: "5px" }}></div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div
                  className="am-panel-hd"
                  style={{ padding: "2px 5px", fontSize: 16 }}
                >
                  Input
                </div>
                <div className="am-panel-bd" style={{ padding: "5px" }}></div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div
                  className="am-panel-hd"
                  style={{ padding: "2px 5px", fontSize: 16 }}
                >
                  Output
                </div>
                <div className="am-panel-bd" style={{ padding: "5px" }}></div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div
                  className="am-panel-hd"
                  style={{ padding: "2px 5px", fontSize: 16 }}
                >
                  Example
                </div>
                <div className="am-panel-bd" style={{ padding: "5px" }}></div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div
                  className="am-panel-hd"
                  style={{ padding: "2px 5px", fontSize: 16 }}
                >
                  Note
                </div>
                <div className="am-panel-bd" style={{ padding: "5px" }}></div>
              </div>
            </Col>

            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 5, order: 2 }}
              xl={{ span: 5, order: 2 }}
            >
              <SiderMenu
                current={"statement"}
                menuItemList={SiderMenuItemList}
                direction={"right"}
              />
            </Col>
          </Row>
        </div>
      </BasicLayout>
    </>
  );
};

export default ProblemViewPage;
