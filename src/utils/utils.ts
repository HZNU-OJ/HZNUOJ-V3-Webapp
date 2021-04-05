import { parse } from "querystring";
import request from "./request";
import customConfig from "@/../customConfig";

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

export const getCustomTitle = (prefix: string): string => {
  return [prefix, customConfig.title].join(" - ");
};

export function timeFormat(timeStamp: number) {
  let date = new Date(timeStamp * 1000);
  let y: number | string = date.getFullYear();
  let m: number | string = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d: number | string = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
}
