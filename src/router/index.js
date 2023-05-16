import Vue from "vue";
import VueRouter from "vue-router";

// components
import HomeView from "@/views/HomeView";
import UserManualView from "@/views/UserManualView.vue";
import ManualIndexVue from "@/components/ManualIndex.vue";
import JsonToSource from "@/views/JsonToSource.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HOME_VIEW",
    component: UserManualView,
  },
  {
    path: "/soure-to-json",
    name: "CONVERTER_VIEW",
    component: HomeView,
  },
  {
    path: "/json-to-source",
    name: "JSON_TO_SOURCE",
    component: JsonToSource,
  },
  {
    path: "/manuals/:manualCategory",
    name: "MANUAL_INDEX",
    component: ManualIndexVue,
  },
  {
    path: "*",
    redirect: {
      name: "HOME_VIEW",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
