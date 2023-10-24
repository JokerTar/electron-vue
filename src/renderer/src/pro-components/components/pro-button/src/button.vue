<template>
	<a-button @click="ClickEvent" :loading="loadingRef" :disabled="disabledRef" v-bind="getBind">
		<template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="record">
			<slot :name="slot" v-bind="record || {}"></slot>
		</template>
	</a-button>
</template>
<script lang="ts" setup>
import { useButton } from '../hooks';
import { buttonProps } from './button';

const props = defineProps(buttonProps);

const { getBind, loadingRef, disabledRef, ClickEvent } = useButton(props);
</script>
