import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "WQ-KNOWLEDGE",
    //   description: "A knowledge for WQ",
    // },
    "/zh/": {
      lang: "zh-CN",
      title: "WQ-知识库",
      description: "WQ的知识库",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
