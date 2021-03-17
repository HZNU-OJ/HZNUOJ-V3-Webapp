export default [
  {
    path: "/users",
    component: "@/pages/user/users/UsersPage",
    exact: true,
  },
  {
    path: "/user/:username",
    component: "@/pages/user/view/UserViewPage",
    exact: true,
  },
];
