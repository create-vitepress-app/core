import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Vitepress App",
  description: "A Vitepress app.",
  cleanUrls: true,

  head: [["link", { rel: "icon", type: "image/x-icon", href: "/favicon.svg" }]],

  themeConfig: {
    logo: "/favicon.svg",
    nav: [{ text: "Docs", link: "/docs/" }],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Introduction", link: "/docs/" },
          { text: "Other things", link: "/docs/other" },
        ],
      },
    ],
  },
});
