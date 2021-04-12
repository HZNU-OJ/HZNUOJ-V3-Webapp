import { history, useLocation } from "umi";
import { message } from "antd";

export function useRedirectLogin() {
  const location = useLocation();
  return function () {
    const redirectPath = location.pathname + location.search;
    history.push({
      pathname: "/login",
      query: {
        redirect: redirectPath,
      },
    });
    message.info("Please login first!");
  };
}
