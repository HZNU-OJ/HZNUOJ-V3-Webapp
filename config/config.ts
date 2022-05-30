import { defineConfig } from "umi";

import routes from "./routes";
import proxy from "./proxy";

import { EditorLanguage } from "monaco-editor-webpack-plugin/out/languages";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const monacoEditorSupportedLanguages = [
  "abap",
  "apex",
  "azcli",
  "bat",
  "cameligo",
  "clojure",
  "coffee",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lexon",
  "lua",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sophia",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
];

export default defineConfig({
  polyfill: {
    imports: ["core-js/stable"],
  },
  // dynamicImport: {
  //   loading: "@/components/GlobalLoading",
  // },
  dynamicImportSyntax: {},
  chunks: ["basic", "vendors.umi", "umi"],
  chainWebpack: (config, { webpack }) => {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: "all",
          minSize: 30000,
          maxSize: 0,
          name: true,
          minChunks: 1,
          maxAsyncRequests: 10,
          maxInitialRequests: 5,
          automaticNameDelimiter: ".",
          cacheGroups: {
            basic: {
              name: "basic",
              test({ resource }) {
                return /(@antd|antd|@ant-design|react)/.test(resource);
              },
              priority: 100,
            },
            monacoEditor: {
              name: true,
              test({ resource }) {
                return /monaco/.test(resource);
              },
              priority: 99,
            },
          },
        },
      },
    });

    //更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    config.plugin("monaco-editor-webpack-plugin").use(MonacoWebpackPlugin, [
      {
        languages: monacoEditorSupportedLanguages as EditorLanguage[],
        // After setting `config.publicPath`,
        // there is no need to set it separately in the plugin
        // publicPath: "__PUBLIC_PATH__",
      },
    ]);

    return config;
  },
  extraBabelPlugins: [
    [
      "prismjs",
      {
        languages: Object.keys(
          require("prismjs/components.js").languages,
        ).filter((name) => name !== "meta"),
        // "languages": ["javascript", "css", "markup"],
        plugins: ["line-numbers"],
        // "theme": "twilight",
        // "theme": "tomorrow",
        // "css": true
      },
    ],
  ],
  devServer: {
    port: 8000,
    host: "0.0.0.0",
  },
  nodeModulesTransform: {
    type: "none",
  },
  metas: [
    {
      name: "keywords",
      content: "icpc, ccpc, online-judge",
    },
    {
      name: "description",
      content: "Online Judge",
    },
  ],
  hash: true,
  fastRefresh: {},
  // use helmet to set title
  title: false,
  publicPath: "/",
  runtimePublicPath: true,
  favicon: "/favicon.png",
  routes: routes,
  proxy: proxy,
});
