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
    component: "@/pages/admin/contest/contests/ContestsPage",
    exact: true,
  },
  {
    path: "/admin/contest/:id",
    exact: true,
    redirect: "/admin/contest/dashboard/:id",
  },
  {
    path: "/admin/contest/dashboard/:id",
    component: "@/pages/admin/contest/view/DashboardPage",
    exact: true,
  },
  {
    path: "/admin/contest/problem/:id",
    component: "@/pages/admin/contest/view/ProblemPage",
    exact: true,
  },
  {
    path: "/admin/contest/user/:id",
    component: "@/pages/admin/contest/view/UserPage",
    exact: true,
  },
  {
    path: "/admin/contest/email/:id",
    component: "@/pages/admin/contest/view/EmailPage",
    exact: true,
  },
];
