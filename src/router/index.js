import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/Login/LoginPage.vue";
import { useUserStore } from "../stores/useUserStore";
import HomeView from "../views/HomeView.vue";
const routes = [
  /* {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" * / '../views/AboutView.vue')
  }*/
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "alerts",
        name: "alerts",
        component: () => import("../components/Alerts/AlertsList"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
