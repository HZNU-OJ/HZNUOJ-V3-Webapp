export default [
  {
    path: "/polygon",
    exact: true,
    redirect: "/polygon/problem",
  },
  {
    path: "/polygon/problem",
    exact: true,
    component: "@/pages/polygon/problems/ProblemsPage",
  },
  {
    path: "/polygon/problem/:id",
    exact: true,
    redirect: "/polygon/problem/dashboard/:id",
  },
  {
    path: "/polygon/problem/dashboard/:id",
    exact: true,
    component: "@/pages/polygon/problem/DashboardPage",
  },
  {
    path: "/polygon/problem/statement/:id",
    exact: true,
    component: "@/pages/polygon/problem/StatementPage",
  },
  {
    path: "/polygon/problem/files/:id",
    exact: true,
    component: "@/pages/polygon/problem/FilesPage",
  },
  {
    path: "/polygon/problem/checker/:id",
    exact: true,
    component: "@/pages/polygon/problem/CheckerPage",
  },
  {
    path: "/polygon/problem/validator/:id",
    exact: true,
    component: "@/pages/polygon/problem/ValidatorPage",
  },
  {
    path: "/polygon/problem/tests/:id",
    exact: true,
    component: "@/pages/polygon/problem/TestsPage",
  },
  {
    path: "/polygon/problem/solutions/:id",
    exact: true,
    component: "@/pages/polygon/problem/SolutionsPage",
  },
  {
    path: "/polygon/problem/manageaccess/:id",
    exact: true,
    component: "@/pages/polygon/problem/ManageAccessPage",
  },
];
