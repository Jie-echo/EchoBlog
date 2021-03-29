import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        redirect: { name: "Index" }
      },
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/index/Index.vue")
      },
      {
        path: "/article",
        name: "Article",
        component: () => import("../views/article/Article.vue")
      },
      {
        path: "/lable",
        name: "Lable",
        component: () => import("../views/lable/Lable.vue")
      },
      {
        path: "/talk",
        name: "Talk",
        component: () => import("../views/talk/Talk.vue")
      },
      {
        path: "/time",
        name: "Time",
        component: () => import("../views/time/Time.vue")
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/about/About.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/wirteArticle",
    name: "wirteArticle",
    component: () => import("../views/article/wirteArticle/wirteArticle.vue")
  },
  {
    path: "/articleDetail",
    name: "articleDetail",
    component: () => import("../views/article/articleDetail/articleDetail.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
