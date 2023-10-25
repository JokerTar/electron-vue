<template>
	<a-pagination
		v-model:current="currentRef"
		v-model:pageSize="pageSizeRef"
		show-size-changer
		:total="1000"
		@change="change"
		@showSizeChange="onShowSizeChange"
	/>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { paginationProps } from 'ant-design-vue/lib/pagination';

export default defineComponent({
	props: {
		...paginationProps(),
	},

	setup() {
		const currentRef = ref(1);
		const pageSizeRef = ref(10);

		const change = (page, pageSize) => {
			console.log(page, pageSize);
		};

		const onShowSizeChange = (current, size) => {
			console.log(current, size);
		};

		return {
			currentRef,
			pageSizeRef,
			change,
			onShowSizeChange,
		};
	},
});
</script>
