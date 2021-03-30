import React, { useEffect, useState } from "react";
import style from "./Progress.less";
import { getStatus, getWidth, progress_active, progress_status } from "./model";

interface ProgressProps {
  startTime: number;
  endTime: number;
  frozenTime: number;
}

const Progress: React.FC<ProgressProps> = (props) => {
  let timer: any = null;

  function clearTimer() {
    timer && clearInterval(timer);
  }

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [frozenTime, setFrozenTime] = useState(null);
  const [status, setStatus] = useState(0);
  const [width, setWidth] = useState(0);

  async function update() {
    setStartTime(props.startTime);
    setEndTime(props.endTime);
    setFrozenTime(props.frozenTime);
    const setStatusAndWidth = () => {
      const _status = getStatus(
        props.startTime,
        props.endTime,
        props.frozenTime,
      );
      const _width = getWidth(props.startTime, props.endTime);
      setStatus(_status);
      setWidth(_width);
      if (width >= 100) {
        clearTimer();
      }
    };
    setStatusAndWidth();
    clearTimer();
    timer = setInterval(() => {
      setStatusAndWidth();
    }, 500);
  }

  useEffect(() => {
    update();
    return clearTimer();
  }, []);

  return (
    <>
      <div
        className={[
          style["am-progress"],
          style["am-progress-striped"],
          style[progress_active[status]],
        ].join(" ")}
        style={{ height: 16, marginBottom: 0 }}
      >
        <div
          className={[
            style["am-progress-bar"],
            style[progress_status[status]],
          ].join(" ")}
          style={{ width: [width, "%"].join("") }}
        ></div>
      </div>
    </>
  );
};

export default Progress;
