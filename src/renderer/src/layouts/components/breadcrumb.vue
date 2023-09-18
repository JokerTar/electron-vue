<template>
	<div class="layout-breadcrumb">
		<div class="layout-breadcrumb-main"></div>
		<div class="layout-breadcrumb-placeholder"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.layout-breadcrumb {
	.layout-breadcrumb-main {
		position: fixed;
		z-index: 1;
		padding: 0 50px;
		width: 100%;
		height: 48px;
		background-color: #333;
	}

	.layout-breadcrumb-placeholder {
		position: relative;
		top: 0;
		left: 0;
		height: 48px;
		background-color: transparent;
	}
}
</style>
