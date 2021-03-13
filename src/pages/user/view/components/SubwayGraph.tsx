import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import style from "../UserViewPage.module.less";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();
const INF = 0x3f3f3f3f;

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const randomValues = getRange(365).map((index) => {
  const count = getRandomInt(0, 50);
  return {
    date: shiftDate(today, -index),
    count: count,
    color: Math.ceil(count / 51 / 0.25),
  };
});

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Count {
  date: Date;
  count: number;
  color: number;
}

function timeFormat(timeStamp: number) {
  let date = new Date(timeStamp * 1000);
  let y: number | string = date.getFullYear();
  let m: number | string = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d: number | string = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
}

const SubwayGraph: React.FC<{}> = (props) => {
  const submitCount = randomValues;

  return (
    <>
      <div className={`${style.border} ${style.subwayGraph}`}>
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={submitCount}
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
      </div>
    </>
  );
};

export { SubwayGraph };
