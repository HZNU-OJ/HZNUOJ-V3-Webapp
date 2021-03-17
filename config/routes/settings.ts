export default [
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
];
