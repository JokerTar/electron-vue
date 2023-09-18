<template>
	<div class="layout-header">
		<div class="layout-header-main">
			<div>
				<slot></slot>
			</div>
			<div>
				<slot name="right"></slot>
			</div>
		</div>

		<div class="layout-header-placeholder"></div>
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
.layout-header {
	.layout-header-main {
		position: fixed;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding: 0 50px;
		width: 100%;
		height: 64px;
		color: rgb(0 0 0 / 85%);
		background: #001529;
		line-height: 64px;
		// background-color: transparent;
	}

	.layout-header-placeholder {
		position: relative;
		top: 0;
		left: 0;
		height: 64px;
		background-color: transparent;
	}
}
</style>
