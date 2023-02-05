import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Vitepress App",
  description: "A Vitepress app.",
  cleanUrls: true,

  themeConfig: {
    logo: "/static/logo.svg",
    nav: [{ text: "Docs", link: "/docs" }],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Other things", link: "/other" },
        ],
      },
    ],
  },
});
