import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import store from '@renderer/store';
import ProForm from '@renderer/pro-components';
import { registerRouter } from '@renderer/router/register';
import { registerDirectives } from '@renderer/directives';

import 'ant-design-vue/dist/antd.css';
import '@renderer/styles/global.less';

const app = createApp(App);

app.use(Antd);
app.use(store);
app.use(ProForm);
registerRouter(app);
registerDirectives(app);

app.mount('#app');
