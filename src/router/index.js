import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Registration/Login";
import Registration from "@/components/Registration/Registration";
import Home from "../components/Home";
import Main from "../components/Main";
import Women from "../views/Women";
import Outlet from "../views/Outlet";
import Men from "../views/Men";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/register",
        name: "Register",
        component: Registration
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      }
    ]
  },

  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/main/women",
        name: "Women",
        component: Women
      },
      {
        path: "/main/outlet",
        name: "Outlet",
        component: Outlet
      },
      {
        path: "/main/men",
        name: "Men",
        component: Men
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
