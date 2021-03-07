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
