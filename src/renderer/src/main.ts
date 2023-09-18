import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import store from '@renderer/store';
import { registerRouter } from '@renderer/router/register';
import { registerDirectives } from '@renderer/directives';

import 'ant-design-vue/dist/antd.css';
import '@renderer/styles/global.less';

const app = createApp(App);

app.use(Antd);
app.use(store);
registerRouter(app);
registerDirectives(app);

app.mount('#app');
