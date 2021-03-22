export default [
  {
    path: "/discussions",
    component: "@/pages/discussion/discussions/DiscussionsPage",
    exact: true,
  },
  {
    path: "/discussion/new",
    component: "@/pages/discussion/new/DiscussionNewPage",
    export: true,
  },
  {
    path: "/discussion/:id",
    component: "@/pages/discussion/view/DiscussionViewPage",
    exact: true,
  },
  {
    path: "/discussion/:id/edit",
    component: "@/pages/discussion/edit/DiscussionEditPage",
    exact: true,
  },
];
