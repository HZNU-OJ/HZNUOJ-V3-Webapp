export default [
  {
    path: "/",
    component: "@/pages/home/HomePage",
    exact: true,
  },
  {
    path: "/login",
    component: "@/pages/auth/login/LoginPage",
    exact: true,
  },
  {
    path: "/register",
    component: "@/pages/auth/register/RegisterPage",
    exact: true,
  },
  {
    path: "/forgot-password",
    component: "@/pages/auth/forgot-password/ForgotPasswordPage",
    exact: true,
  },
  {
    path: "/contests",
    component: "@/pages/contest/contests/ContestsPage",
    exact: true,
  },
  {
    path: "/problemset",
    component: "@/pages/problem/problem-set/ProblemSetPage",
    exact: true,
  },
  {
    path: "/submissions",
    component: "@/pages/submission/submissions/SubmissionsPage",
    exact: true,
  },
  {
    path: "/users",
    component: "@/pages/user/users/UsersPage",
    exact: true,
  },
  {
    path: "/disscussion/:id",
    component: "@/pages/discussion/view/DiscussionViewPage",
    exact: true,
  },
  {
    path: "/403",
    component: "@/pages/403",
    exact: true,
  },
  {
    path: "/404",
    component: "@/pages/404",
    exact: true,
  },
  {
    path: "/500",
    component: "@/pages/500",
    exact: true,
  },
];
