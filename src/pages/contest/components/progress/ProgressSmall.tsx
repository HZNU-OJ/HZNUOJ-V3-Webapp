import React, { useEffect, useState } from "react";
import { getStatus, status_type, timerInterval, getTimePending } from "./model";
import Progress from "./Progress";
import style from "./Progress.less";

interface ProgressSmallProps {
  startTime: number;
  endTime: number;
  frozenTime: number;
}

const ProgressSmall: React.FC<ProgressSmallProps> = (props) => {
  let timer = null;
  function clearTimer() {
    timer && clearInterval(timer);
  }

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [frozenTime, setFrozenTime] = useState(null);
  const [status, setStatus] = useState(0);
  const [pendingTime, setPendingTime] = useState("");

  async function update() {
    setStartTime(props.startTime);
    setEndTime(props.endTime);
    setFrozenTime(props.frozenTime);
    const setDynamicParams = () => {
      const _status = getStatus(
        props.startTime,
        props.endTime,
        props.frozenTime,
      );
      const _pendingTime = getTimePending(props.startTime);
      setPendingTime(_pendingTime);
      setStatus(_status);
    };
    setDynamicParams();
    clearTimer();
    timer = setInterval(() => {
      setDynamicParams();
    }, timerInterval);
  }

  useEffect(() => {}, []);

  return (
    <>
      <div style={{ marginBottom: "2px", display: "flex" }}>
        <div style={{ float: "left" }}></div>
        <div style={{ flex: "1" }}>
          <div
            className={[style["label"], style[status_type[status]]].join(" ")}
          ></div>
          <b>
            {status_type[status]}&nbsp;
            {status === 0 && pendingTime}
          </b>
        </div>
        <div style={{ float: "right" }}></div>
      </div>

      <Progress
        startTime={startTime}
        endTime={endTime}
        frozenTime={frozenTime}
      />
    </>
  );
};

export default ProgressSmall;
export { ProgressSmall };
