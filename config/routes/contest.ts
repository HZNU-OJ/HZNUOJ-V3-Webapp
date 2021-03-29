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
  {
    path: "/contest/:id/problem/:pid",
    component: "@/pages/contest/problem/ProblemPage",
    exact: true,
  },
  {
    path: "/contest/:id/submissions",
    component: "@/pages/contest/submissions/SubmissionsPage",
    exact: true,
  },
  {
    path: "/contest/:id/standings",
    component: "@/pages/contest/standings/StandingsPage",
    exact: true,
  },
  {
    path: "/contest/:id/clarifications",
    component: "@/pages/contest/clarifications/ClarificationsPage",
    exact: true,
  },
  {
    path: "/contest/:id/print",
    component: "@/pages/contest/print/PrintPage",
    exact: true,
  },
];
