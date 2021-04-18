import customConfig from "../customConfig";

export default {
  "/api": {
    target: customConfig.api_proxy_target,
    changeOrigin: true,
  },
};
