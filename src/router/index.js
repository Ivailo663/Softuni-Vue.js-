import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main";
import Women from "../views/Women";
import Outlet from "../views/Outlet";
import Men from "../views/Men";
import Checkout from "../views/Checkout";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home/menSection",
    component: Main,
    children: [
      {
        path: "/home/womenSection",
        name: "Women",
        component: Women,
      },
      {
        path: "/home/outlet",
        name: "Outlet",
        component: Outlet,
      },
      {
        path: "/home/menSection",
        name: "Men",
        component: Men,
      },
    ],
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    // meta: {
    //   requiresAuth: true,
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.userLogged) {
      console.log(store.state.login, ".. you shall not pass");

      return;
    }
    next("/home/menSection");
  }
  next();
});
export default router;
