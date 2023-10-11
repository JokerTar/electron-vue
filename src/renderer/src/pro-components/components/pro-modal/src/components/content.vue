<template>
	<!-- 渲染tabs.children -->
	<template v-if="tabsChildren">
		<component :is="tabsChildren?.type" v-bind="tabsChildren?.props"></component>
	</template>

	<!-- 渲染tabs.pane.children -->
	<template v-else>
		<component :is="tabsPaneChildren?.type" v-bind="tabsPaneChildren?.props" :key="activeKey"></component>
	</template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		activeKey: {
			type: [String, Number],
		},

		tabsChildren: {
			type: Object,
		},

		tabsPaneChildren: {
			type: Object,
		},
	},
	setup(_props, { slots }) {
		console.log(slots);
		// console.log(slots.default());
		return {};
	},
});
</script>
