<template>
	<a-modal
		v-bind="getBind"
		v-model:visible="visible"
		:class="[
			ns.b(),
			tabs && (tabs?.tabPosition == 'top' || !tabs?.tabPosition) ? 'has-top-tabs' : '',
			tabs && (tabs?.tabPosition == 'left' || tabs?.tabPosition == 'right') ? 'has-content-tabs' : '',
		]"
		:wrap-class-name="fullModal"
		@ok="close"
		@cancel="close"
		:wrap-style="{ overflow: 'hidden' }"
		:closable="false"
	>
		<!-- header -->
		<template #title>
			<div>
				<div :class="[ns.m('header')]" ref="modalTitleRef">
					<div :class="[ns.m('header-wrap')]">
						<div :class="['ant-drawer-title']">
							<slot name="title">{{ title }}</slot>
						</div>
						<div :class="['ant-drawer-extra']">
							<slot name="extra"></slot>
						</div>
					</div>

					<div>
						<a-button v-if="!isFull" type="text" @click="targetFullModal" initial size="small">
							<template #icon><FullscreenOutlined /></template>
						</a-button>

						<a-button v-else type="text" @click="targetFullModal" initial size="small">
							<template #icon><FullscreenExitOutlined /></template>
						</a-button>

						<a-divider type="vertical" />

						<a-button type="text" v-if="closable" @click="close" initial size="small">
							<template #icon><CloseOutlined /></template>
						</a-button>
					</div>
				</div>

				<div
					v-if="tabs && (tabs?.tabPosition == 'top' || !tabs?.tabPosition)"
					:class="[ns.em('header-tabs')]"
					style="width: 100%"
				>
					<a-tabs
						v-model:activeKey="activeKey"
						v-bind="getTabsBind"
						:style="{ width: calculatedValue(isFull ? '100%' : width) }"
					>
						<a-tab-pane v-for="item in tabs?.tabsPane" :key="item.tabKey" :tab="item.tab" />

						<template
							v-for="slot in Object.keys($slots).filter((slotNama) => tabsSlots.includes(slotNama))"
							#[slot]="record"
							:key="slot"
						>
							<slot :name="slot" v-bind="record || {}"></slot>
						</template>
					</a-tabs>
				</div>
			</div>
		</template>

		<!-- content -->
		<template #default>
			<div :class="[ns.m('content'), tabs && tabs?.tabPosition == 'right' ? 'row-reverse' : '']">
				<div v-if="tabs?.tabPosition === 'left' || tabs?.tabPosition === 'right'" :class="[ns.m('content-tabs')]">
					<a-tabs
						v-model:activeKey="activeKey"
						:tab-position="tabs?.tabPosition"
						v-bind="getTabsBind"
						style="height: 100%"
					>
						<a-tab-pane v-for="item in tabs?.tabsPane" :key="item.tabKey" :tab="item.tab" />

						<template
							v-for="slot in Object.keys($slots).filter((slotNama) => tabsSlots.includes(slotNama))"
							#[slot]="record"
							:key="slot"
						>
							<slot :name="slot" v-bind="record || {}"></slot>
						</template>
					</a-tabs>
				</div>
				<div :class="[ns.m('content-wrap')]">
					<!-- 优先渲染插槽 -->
					<template v-if="$slots.default">
						<slot></slot>
					</template>

					<template v-else>
						<Content :tabsChildren="getTabsChildren" :activeKey="activeKey" :tabsPaneChildren="getTabsPaneChildren" />
					</template>
				</div>
			</div>
		</template>

		<!-- footer -->
		<template #footer>
			<div>
				<div :class="[ns.m('footer')]">
					<div :class="[ns.m('footer-extra')]">
						<slot name="footerExtra"></slot>
					</div>

					<div :class="[ns.m('footer-actions')]">
						<slot name="footer">
							<a-space>
								<a-button v-if="showCancelBtn" v-bind="cancelBtnProps" @click="EventCancel">{{ cancelText }}</a-button>
								<a-button v-if="showOkBtn" v-bind="okBtnProps" @click="EventOk">{{ props.okText }}</a-button>
							</a-space>
						</slot>
					</div>
				</div>
			</div>
		</template>

		<template
			v-for="slot in Object.keys($slots).filter(
				(slotNama) => !['title', 'default', 'footer', ...tabsSlots].includes(slotNama)
			)"
			#[slot]="record"
			:key="slot"
		>
			<slot :name="slot" v-bind="record || {}"></slot>
		</template>

		<template #modalRender="{ originVNode }">
			<div :style="isFull ? {} : transformStyle">
				<component :is="originVNode" />
			</div>
		</template>
	</a-modal>
</template>

<script lang="ts" setup>
import { modalProps, modalEmits } from './modal';
import { useModal, useModalStyle } from '../hooks';
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import Content from './components/content.vue';

const props = defineProps(modalProps);
const emits = defineEmits(modalEmits);

const {
	visible,
	activeKey,
	getBind,
	getTabsBind,
	isFull,
	fullModal,
	close,
	targetFullModal,
	getTabsChildren,
	getTabsPaneChildren,
	tabsSlots,
	EventOk,
	EventCancel,
} = useModal(props, emits);

const { ns, modalTitleRef, transformStyle, calculatedValue } = useModalStyle();
</script>

<script lang="ts">
export default {
	options: {
		styleIsolation: 'shared',
	},
};
</script>

<style lang="less">
.pro-modal {
	&.has-top-tabs {
		.ant-modal-header {
			padding: 0;

			.pro-modal--header {
				padding: 16px 24px;
				width: 100%;
			}

			.ant-tabs {
				position: relative;
				top: 1px;

				> .ant-tabs-nav {
					padding: 0 24px;
					margin-bottom: 0;
				}
			}
		}
	}

	&.has-content-tabs {
		.ant-modal-body {
			padding: 0;

			.pro-modal--content {
				display: flex;
				height: 100%;

				&.row-reverse {
					flex-direction: row-reverse;
				}

				&-wrap {
					flex: auto;
					padding: 24px;
				}

				&-tabs {
					height: 100%;
				}
			}
		}
	}

	&--header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: move;

		&-wrap {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			> .ant-drawer-title {
				flex: unset;
			}
		}
	}

	&--footer {
		display: flex;
		justify-content: space-between;

		// &-actions {
		// }

		&-extra {
			flex: 1;
		}
	}
}

.full-modal {
	.ant-modal {
		top: 0;
		padding-bottom: 0;
		margin: 0;
		width: 100% !important;
		max-width: 100%;

		.ant-modal-content {
			display: flex;
			flex-direction: column;
			height: 100vh;

			.ant-modal-body {
				flex: 1;
			}
		}
	}
}
</style>
