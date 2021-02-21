import Vue from "vue";
import VueRouter from "vue-router";
// import App from "@/App.vue";
import Add from "@/views/Add.vue";
import Base from "@/views/Base.vue";
import DetailsGoal from "@/views/DetailsGoal";
import Edit from "@/views/Edit";
import Config from "@/views/Config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/add",
    name: "add",
    component: Add
  },
  {
    path: "/",
    name: "base",
    component: Base
  },
  {
    path: "/meta/:id",
    name: "DetailsGoal",
    component: DetailsGoal
  },
  {
    path: "/meta/:id/edit",
    name: "Edit",
    component: Edit
  },
  {
    path: "/config",
    name: "Config",
    component: Config
  }
  // {
  //   // path: "/about",
  //   // name: "About",
  //   // // route level code-splitting
  //   // // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
