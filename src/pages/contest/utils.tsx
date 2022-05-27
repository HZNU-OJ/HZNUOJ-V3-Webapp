import { parse } from "querystring";
import request from "@/utils/request";
import { ProblemItem } from "@/pages/submission/components/SubmissionsTable";
import { Tooltip } from "antd";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split("?")[1]);

export const trim = (str: String) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

export const deepCopy = (Obj: any) => {
  return JSON.parse(JSON.stringify(Obj));
};

export const getJSON = (url: string) => {
  return new Promise((resolve, reject) => {
    request.get(url).then((response: Response) => {
      resolve(response);
    });
  });
};

export const removeDuplicateItems = (arr: any) => [...new Set(arr)];

export const getNowTimeStamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

export function getDisplayTime(time: number) {
  return Math.floor(time / 60);
}

export const getStarKey = (team_id: any) => {
  return `${window.location.pathname}-star-${team_id}`;
};

const changeTimeStamp = (timeStamp: number) => {
  return (timeStamp + "").length === 10 ? timeStamp * 1000 : timeStamp;
};

export const timeFormat = (timeStamp: number) => {
  timeStamp = changeTimeStamp(timeStamp);
  let date = new Date(timeStamp);
  let y: number | string = date.getFullYear();
  let m: number | string = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d: number | string = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h: number | string = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute: number | string = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second: number | string = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};

export const getTimeDiff = (timeStamp: number) => {
  let two = (a: number) => {
    if (a < 10) return "0" + a;
    return a;
  };
  let h = Math.floor(timeStamp / 3600);
  let m = Math.floor((timeStamp % 3600) / 60);
  let s = timeStamp % 60;
  return [two(h), two(m), two(s)].join(":");
};

export const formatDate = (
  timeStamp: number,
  type = "Y-M-D H:I:S",
  auto = true,
) => {
  timeStamp = changeTimeStamp(timeStamp);
  let time = new Date(timeStamp);
  let _year = time.getFullYear();
  let _month =
    time.getMonth() + 1 < 10
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1;
  let _date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let _hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let _minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let _secconds =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let formatTime: number | string = "";
  let distinctTime = new Date().getTime() - time.getTime();

  if (auto) {
    if (distinctTime <= 1 * 60 * 1000) {
      // console.log('一分钟以内，以秒数计算');
      let _s = Math.floor((distinctTime / 1000) % 60);
      formatTime = _s + "秒前";
    } else if (distinctTime <= 1 * 3600 * 1000) {
      // console.log('一小时以内,以分钟计算');
      let _m = Math.floor((distinctTime / (60 * 1000)) % 60);
      formatTime = _m + "分钟前";
    } else if (distinctTime <= 24 * 3600 * 1000) {
      // console.log('一天以内，以小时计算');
      let _h = Math.floor((distinctTime / (60 * 60 * 1000)) % 24);
      formatTime = _h + "小时前";
    } else if (distinctTime <= 30 * 24 * 3600 * 1000) {
      let _d = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30);
      formatTime = _d + "天前";
      // console.log('30天以内,以天数计算');
    } else {
      // 30天以外只显示年月日
      formatTime = _year + "-" + _month + "-" + _date;
    }
  } else {
    switch (type) {
      case "Y-M-D H:I:S":
        formatTime =
          _year +
          "-" +
          _month +
          "-" +
          _date +
          " " +
          _hours +
          ":" +
          _minutes +
          ":" +
          _secconds;
        break;
      case "Y-M-D H:I:S zh":
        formatTime =
          _year +
          "年" +
          _month +
          "月" +
          _date +
          "日  " +
          _hours +
          ":" +
          _minutes +
          ":" +
          _secconds;
        break;
      case "Y-M-D H:I":
        formatTime =
          _year + "-" + _month + "-" + _date + " " + _hours + ":" + _minutes;
        break;
      case "Y-M-D H":
        formatTime = _year + "-" + _month + "-" + _date + " " + _hours;
        break;
      case "Y-M-D":
        formatTime = _year + "-" + _month + "-" + _date;
        break;
      case "Y-M-D zh":
        formatTime = _year + "年" + _month + "月" + _date + "日";
        break;
      case "Y-M":
        formatTime = _year + "-" + _month;
        break;
      case "Y":
        formatTime = _year;
        break;
      case "M":
        formatTime = _month;
        break;
      case "D":
        formatTime = _date;
        break;
      case "H":
        formatTime = _hours;
        break;
      case "I":
        formatTime = _minutes;
        break;
      case "S":
        formatTime = _secconds;
        break;
      default:
        formatTime =
          _year +
          "-" +
          _month +
          "-" +
          _date +
          " " +
          _hours +
          ":" +
          _minutes +
          ":" +
          _secconds;
        break;
    }
  } // 返回格式化的日期字符串
  return formatTime;
};

export const getQueryString = (queryName: any, search: any) => {
  const params = new URLSearchParams(search);
  return params.get(queryName);
};

export const entries = function* entries(obj: any) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
};

export function getQueryParams(
  queryName: string,
  queryValue: string,
  search: any,
) {
  const params = new URLSearchParams(search);
  let query: any = {};
  for (const [k, v] of params) {
    query[k] = v;
  }
  query[queryName] = queryValue;
  return query;
}

export function getProblemByOrderId(
  contest: ApiTypes.GetContestResponseDto,
  orderId: number,
): ApiTypes.ProblemInContestMetaDto {
  return contest.problemMetas.filter(
    (problem) => problem.orderId === orderId,
  )[0];
}

export function getProblemByAlphaId(
  contest: ApiTypes.GetContestResponseDto,
  alphaId: string,
): ApiTypes.ProblemInContestMetaDto {
  return contest.problemMetas.filter(
    (problem) => mappingOrderIdToAlphaId(problem.orderId) === alphaId,
  )[0];
}

export function getProblemByProblemId(
  contest: ApiTypes.GetContestResponseDto,
  problemId: number,
): ApiTypes.ProblemInContestMetaDto {
  return contest.problemMetas.filter(
    (problem) => problem.problemId === problemId,
  )[0];
}

export function mappingOrderIdToAlphaId(orderId: number) {
  return String.fromCharCode("A".charCodeAt(0) + orderId - 1);
}

export function mappingAlphaIdToOrderId(alpha: string) {
  return alpha.charCodeAt(0) - "A".charCodeAt(0) + 1;
}

export function getProblemRenderFunc(contest: ApiTypes.GetContestResponseDto) {
  return function problemRender(problem: ProblemItem): JSX.Element {
    const _problem = getProblemByProblemId(contest, problem.id);
    const alphaId = mappingOrderIdToAlphaId(_problem.orderId);
    const title = `${alphaId}. ${_problem.title}`;
    return (
      <a
        href={`/contest/${contest.contestMeta.id}/problem/${alphaId}`}
        target={"_blank"}
      >
        <Tooltip title={title} placement={"top"}>
          <div className={"h-ellipsis"}>{title}</div>
        </Tooltip>
      </a>
    );
  };
}
