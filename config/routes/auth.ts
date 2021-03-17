export default [
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
    path: "/logout",
    component: "@/pages/auth/logout/LogoutPage",
    exact: true,
  },
];
