import { history, useLocation } from "umi";

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
  };
}
