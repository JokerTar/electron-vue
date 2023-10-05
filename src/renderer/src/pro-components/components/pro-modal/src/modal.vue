<template>
	<a-modal v-model:visible="visible" :class="[ns.b()]" v-bind="getBind" @ok="close" @cancel="close">
		<div :class="[ns.em('body')]">
			<div :class="[ns.em('header')]">
				<div :class="[ns.em('header-wrap')]">
					<div :class="[ns.em('header-wrap-title')]">
						<a-button v-if="closable" :class="['ant-drawer-close']" @click="close">
							<close-outlined />
						</a-button>
						<div class="ant-drawer-title">{{ title }}</div>
					</div>
					<div class="ant-drawer-extra">
						<slot name="extra"></slot>
					</div>
				</div>
				<div v-if="tabs && (tabs?.tabPosition == 'top' || !tabs?.tabPosition)" :class="[ns.em('header-tabs')]" style="width: 100%">
					<a-tabs v-model:activeKey="activeKey" v-bind="getTabsBind" @change="tabsChange">
						<a-tab-pane v-for="item in tabs?.tabsPane" :key="item.key" :tab="item.key" />
					</a-tabs>
				</div>
			</div>

			<div :class="[ns.em('content')]">
				<div
					v-if="tabs?.tabPosition === 'left' || tabs?.tabPosition === 'right'"
					:class="[ns.em('left-tabs')]"
					style="position: relative; top: 0; bottom: 0"
				>
					<a-tabs v-model:activeKey="activeKey" :tab-position="tabs?.tabPosition" v-bind="getTabsBind" style="height: 100%" @change="tabsChange">
						<a-tab-pane v-for="item in tabs?.tabsPane" :key="item.key" :tab="item.key" />
					</a-tabs>
				</div>
				<div :class="[ns.em('content-wrap')]">
					<!-- <slot></slot> -->
					<component :is="$slots.default" v-if="$slots.default">
						<template v-for="slot in Object.keys($slots)" #[slot]="record" :key="slot">
							<slot :name="slot" v-bind="record || {}"></slot>
						</template>
					</component>

					<!-- <slot name="content"></slot> -->
					<component :is="$slots.content" v-if="$slots.content">
						<template v-for="slot in Object.keys($slots)" #[slot]="record" :key="slot">
							<slot :name="slot" v-bind="record"></slot>
						</template>
					</component>
				</div>
			</div>
		</div>

		<template v-for="slot in Object.keys($slots)" #[slot]="record" :key="slot">
			<slot :name="slot" v-bind="record || {}"></slot>
		</template>
	</a-modal>
</template>

<script lang="ts" setup>
import { modalProps, modalEmits } from './modal';
import { useModal, useModalStyle } from '../hooks';

const props = defineProps(modalProps);
const emits = defineEmits(modalEmits);

const { visible, activeKey, getBind, getTabsBind, close, tabsChange } = useModal(props, emits);

const { ns } = useModalStyle();
</script>
