export default [
  {
    path: "/contests",
    component: "@/pages/contest/contests/ContestsPage",
    exact: true,
  },
  {
    path: "/contest/:id",
    component: "@/pages/contest/dashboard/DashboardPage",
    exact: true,
  },
];
