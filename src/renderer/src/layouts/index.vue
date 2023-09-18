<template>
	<a-layout class="layout">
		<LayoutHeader>
			<div class="logo" />
			<LayoutMenu />
		</LayoutHeader>
		<Breadcrumb />

		<a-layout-content :style="{ padding: '32px 50px', overflow: 'auto' }">
			<div :style="{ background: '#fff', padding: '24px', minHeight: '100%' }">
				<router-view></router-view>
			</div>
		</a-layout-content>
		<!-- <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer> -->
	</a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import LayoutHeader from './components/layoyt-header.vue';
import Breadcrumb from './components/breadcrumb.vue';
import { LayoutMenu } from './components/layout-menu';

export default defineComponent({
	components: {
		LayoutHeader,
		Breadcrumb,
		LayoutMenu,
	},
	setup() {
		return {
			selectedKeys: ref<string[]>(['2']),
		};
	},
});
</script>
<style>
.site-layout-content {
	padding: 24px;
	min-height: 100%;
	background: #fff;
}

.logo {
	float: left;
	margin: 16px 24px 16px 0;
	width: 120px;
	height: 31px;
	background: rgb(255 255 255 / 30%);
}

.ant-row-rtl #components-layout-demo-top .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
	background: #141414;
}
</style>
