import { defineConfig } from 'umi';
import customConfig from '../customConfig';
import routes from './routes';

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
  routes: routes,
  publicPath: customConfig.publicPath,
});
