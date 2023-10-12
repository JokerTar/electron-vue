<template>
	<template v-if="menu?.meta?.target">
		<a-menu-item :key="menu?.path">
			<a :href="resolvePath('', menu?.meta?.target)" :target="menu?.meta?.blank ? '_blank' : ''">{{
				menu?.meta?.title
			}}</a>
		</a-menu-item>
	</template>

	<template v-else-if="menu?.hideChildrenInMenu">
		<a-menu-item :key="menu?.path">
			<router-link :to="resolvePath(basePath, menu?.path)">{{ menu?.meta?.title }}</router-link>
		</a-menu-item>
	</template>

	<template v-else-if="hasOneShowingChild(menu?.children, menu) && !onlyOneChild?.children">
		<a-menu-item :key="menu?.path">
			<router-link :to="resolvePath(basePath, onlyOneChild?.path)">{{ menu?.meta?.title }}</router-link>
		</a-menu-item>
	</template>

	<template v-else>
		<a-sub-menu :key="menu?.path">
			<template #title>{{ menu?.meta?.title }}</template>
			<a-menu-item-group>
				<a-menu-item v-for="item in menu?.children" :key="resolvePath(basePath, item?.path)">
					<template v-if="item.meta?.target">
						<a :href="resolvePath('', item?.meta?.target)" :target="item?.meta?.blank ? '_blank' : ''">{{
							item?.meta?.title
						}}</a>
					</template>
					<template v-else>
						<router-link :to="resolvePath(basePath, item?.path)">{{ item?.meta?.title }}</router-link>
					</template>
				</a-menu-item>
			</a-menu-item-group>
		</a-sub-menu>
	</template>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Router } from '@renderer/router/types';
import { isExternal, resolvePath as resolve } from '@renderer/utils';

export default defineComponent({
	props: {
		basePath: {
			type: String,
			default: '',
		},

		menu: {
			type: Object as PropType<Router>,
		},
	},
	setup() {
		const onlyOneChild = ref<Router>();

		const hasOneShowingChild = (children: Router['children'] = [], parent) => {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false;
				} else {
					// Temp set(will be used if only has one showing child)
					onlyOneChild.value = item;
					return true;
				}
			});

			// When there is only one child router, the child router is displayed by default
			if (showingChildren.length === 1) {
				return true;
			}

			// Show parent if there are no child router to display
			if (showingChildren.length === 0) {
				onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
				return true;
			}

			return false;
		};

		const resolvePath = (basePath, routePath) => {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(basePath)) {
				return basePath;
			}

			return resolve(basePath, routePath);
		};

		return {
			hasOneShowingChild,
			resolvePath,
			onlyOneChild,
		};
	},
});
</script>
