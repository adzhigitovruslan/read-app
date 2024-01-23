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
