import React, { useEffect, useState } from "react";
import { Row, Col, Space } from "antd";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import style from "../UserViewPage.module.less";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

interface CountItem {
  date: Date;
  count: number;
  color: number;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

interface SubwayGraphProps {
  username: string;
  submissionCountPerDay: number[];
}

const SubwayGraph: React.FC<SubwayGraphProps> = (props) => {
  const [countList, setCountList] = useState([] as CountItem[]);

  function getCountPerDay(index: number) {
    return props.submissionCountPerDay.slice(-index)[0];
  }

  async function getCountList() {
    let maxValue = 20;
    for (let i = 1; i <= 366; ++i) {
      maxValue = Math.max(maxValue, getCountPerDay(i));
    }
    setCountList(
      getRange(366).map((index) => {
        return {
          date: shiftDate(today, -index + 1),
          count: getCountPerDay(index),
          color: Math.ceil(getCountPerDay(index) / (maxValue + 1) / 0.25),
        } as CountItem;
      }),
    );
  }

  useEffect(() => {
    getCountList();
  }, [props.submissionCountPerDay]);

  return (
    <>
      <div className={`${style.border} ${style.subwayGraph}`}>
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={countList}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${value.color}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              "data-tip": `${value.date?.toISOString()?.slice(0, 10)}, ${
                value.count
              } submissions`,
            };
          }}
          showWeekdayLabels={true}
          weekdayLabels={["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]}
        />
        <ReactTooltip />
        <Row gutter={16} align={"top"} className={style["subwayGraph-footer"]}>
          <Col xs={12}>
            <a
              href={`/submissions?username=${props.username}`}
              target={"_blank"}
            >
              Search this user's submissions
            </a>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <Space size={"small"}>
              <span>Less</span>
              <div
                className={`${style["subwayGraph-square"]} ${style["color-github-0"]}`}
              ></div>
              <div
                className={`${style["subwayGraph-square"]} ${style["color-github-1"]}`}
              ></div>
              <div
                className={`${style["subwayGraph-square"]} ${style["color-github-2"]}`}
              ></div>
              <div
                className={`${style["subwayGraph-square"]} ${style["color-github-3"]}`}
              ></div>
              <div
                className={`${style["subwayGraph-square"]} ${style["color-github-4"]}`}
              ></div>
              <span>More</span>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { SubwayGraph };
