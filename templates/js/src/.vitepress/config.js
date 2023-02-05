import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Vitepress App",
  description: "A Vitepress app.",
  srcDir: "./src",
  cleanUrls: true,

  themeConfig: {
    logo: "/static/logo.svg",
  },
});
