export default [
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
];
