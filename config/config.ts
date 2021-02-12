import { defineConfig } from 'umi';
import customConfig from '../customConfig';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  metas: customConfig.metas,
  title: false,
  analytics: customConfig.analytics,
  hash: true,
  favicon: customConfig.favicon,
  fastRefresh: {},
  publicPath: customConfig.publicPath,
});
