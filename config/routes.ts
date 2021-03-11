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
    path: "/settings",
    exact: true,
    redirect: "/settings/profile",
  },
  {
    path: "/settings/profile",
    exact: true,
    component: "@/pages/settings/ProfilePage",
  },
  {
    path: "/settings/security",
    exact: true,
    component: "@/pages/settings/SecurityPage",
  },
  {
    path: "/logout",
    component: "@/pages/auth/logout/LogoutPage",
    exact: true,
  },
  {
    path: "/contests",
    component: "@/pages/contest/contests/ContestsPage",
    exact: true,
  },
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
  {
    path: "/submission/:id",
    component: "@/pages/submission/view/SubmissionViewPage",
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
    path: "/discussion/:id",
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
