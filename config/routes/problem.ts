export default [
  {
    path: "/problem/:id",
    component: "@/pages/problem/view/ProblemViewPage",
    exact: true,
  },
  {
    path: "/problemset",
    component: "@/pages/problem/problem-set/ProblemSetPage",
    exact: true,
  },
];
