import { parse } from "querystring";

export const getPageQuery = () => parse(window.location.href.split("?")[1]);

export const trim = (str: String) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

export const deepCopy = (Obj: any) => {
  return JSON.parse(JSON.stringify(Obj));
};
