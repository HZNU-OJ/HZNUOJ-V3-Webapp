export default [
  {
    path: "/admin",
    exact: true,
    redirect: "/admin/judge-machine",
  },
  {
    path: "/admin/judge-machine",
    component: "@/pages/admin/general/JudgeMachinePage",
    exact: true,
  },
  {
    path: "/admin/contests",
    component: "@/pages/admin/contests/ContestsPage",
    exact: true,
  },
];
