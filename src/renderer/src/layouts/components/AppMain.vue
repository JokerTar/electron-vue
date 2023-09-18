<template>
	<section class="app-main">
		<div class="app-scrollbar">
			<router-view v-slot="{ Component }">
				<transition name="el-fade-in" mode="out-in">
					<!-- <keep-alive :include="tagsViewStore.cachedViews"></keep-alive> -->
					<keep-alive>
						<component :is="Component" :key="key" />
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
// import { useTagsViewStore } from '@renderer/store/modules/tags-view'

export default defineComponent({
	setup() {
		const route = useRoute();
		// const tagsViewStore = useTagsViewStore()

		const key = computed(() => {
			// 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
			return route.path;
		});

		return {
			// tagsViewStore,
			key,
		};
	},
});
</script>

<style lang="less" scoped>
// @import '@/styles/mixins.scss';

.app-main {
	width: 100%;
	background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
	overflow: auto;
	height: 100%;
	// @include scrollbar;
}
</style>
