import error from "./error";
import admin from "./admin";
import polygon from "./polyon";
import settings from "./settings";
import auth from "./auth";
import problem from "./problem";
import contest from "./contest";
import submission from "./submission";
import user from "./user";
import discussion from "./discussion";

export default [
  {
    path: "/",
    component: "@/pages/home/HomePage",
    exact: true,
  },
  ...auth,
  ...settings,
  ...contest,
  ...problem,
  ...submission,
  ...user,
  ...discussion,
  ...polygon,
  ...admin,
  ...error,
];
