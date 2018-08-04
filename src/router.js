import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import auth from "@/auth";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      props: { auth },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/logout",
      name: "logout",
      props: { auth },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Logout.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !auth.isAuthenticated()) {
    return next("/login");
  }

  next();
});

export default router;
