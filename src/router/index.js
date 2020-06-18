import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import Add from "@/views/Add.vue";
import Base from "@/views/Base.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: App
  },{
    path: "/add",
    name: "add",
    component: Add
  },
  {
    path:"/base",
    name:"base",
    component:Base
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
