<template>
	<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
		<template v-for="menu in menus" :key="menu">
			<MenuItem :base-path="menu.path" :menu="menu" />
		</template>
	</a-menu>
	{{ selectedKeys }}
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import MenuItem from './menu-item.vue';
import { usePromiseStore } from '@renderer/store/modules/permission';
import { homePath } from '@renderer/settings';

export default defineComponent({
	components: {
		MenuItem,
	},

	props: {
		basePath: {
			type: String,
			default: '',
		},
	},

	setup() {
		const { getMenus } = usePromiseStore();

		return {
			selectedKeys: ref<string[]>([homePath]),
			menus: getMenus(),
		};
	},
});
</script>
