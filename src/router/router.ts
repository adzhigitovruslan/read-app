import { createRouter, createWebHistory } from "vue-router";
import ContentList from "../views/ContentList.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "content" },
    },
    {
      path: "/content/",
      name: "content",
      component: () => import("../views/ContentList.vue"),
    },
    {
      path: "/authors/",
      name: "authors",
      component: () => import("../views/ContentAuthors.vue"),
    },
    {
      path: "/authors/:id",
      name: "author",
      component: () => import("../views/AuthorDetailPage.vue"),
      props: true,
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
      path: "/notification/:id",
      name: "notification",
      component: () => import("../views/ContentNotification.vue"),
      props: true,
    },
  ],
});
