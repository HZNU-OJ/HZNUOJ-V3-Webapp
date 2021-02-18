export default [
  {
    path: '/',
    component: '@/pages/home/HomePage',
  },
  {
    path: '/login',
    component: '@/pages/auth/login/LoginPage',
  },
  {
    path: '/register',
    component: '@/pages/auth/register/RegisterPage',
  },
  {
    path: '/forgot-password',
    component: '@/pages/auth/forgot-password/ForgotPasswordPage',
  },
  {
    path: '/contests',
    component: '@/pages/contest/contests/ContestsPage',
  },
  {
    path: '/problemset',
    component: '@/pages/problem/problem-set/ProblemSetPage',
  },
];
