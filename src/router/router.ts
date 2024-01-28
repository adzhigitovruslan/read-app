import { createRouter, createWebHistory } from "vue-router";
import ContentList from "../views/ContentList.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ContentList,
    },
    {
      path: "/auth",
      component: () => import("../layouts/AuthLayout.vue"),
      children: [
        {
          path: "",
          redirect: { name: "login" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("../components/auth/LoginPage.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("../components/auth/SignUpPage.vue"),
        },
      ],
    },
    {
      path: "/book/:id",
      component: () => import("../views/ContentListDetailed.vue"),
    },
    {
      path: "/notification/",
      name: "notification",
      component: () => import("../views/ContentNotification.vue"),
    },
  ],
});
