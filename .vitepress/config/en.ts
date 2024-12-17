import { defineConfig } from "vitepress";
import examplesEN from "./examples/en";

export const en = defineConfig({
  lang: "en-US",
  description: "English version for maptalks 3D builder.",

  themeConfig: {
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Guide", link: "/en/guide/what-is" },
      { text: "Examples", link: "/en/examples/" },
    ],

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/examples/": { base: "/en/examples/", items: examplesEN },
    },
  },
});

function sidebarGuide() {
  return [
    {
      text: "Introduction",
      items: [{ text: "Index", link: "what-is" }],
    },
  ];
}

function sidebarExamples() {
  return [
    {
      text: "Basic Usage",
      items: [
        { text: "hello", link: "#hello" },
        { text: "hello2", link: "#hello2" },
      ],
    },
  ];
}
