<template>
	<a-form-item :class="[ns.b(), props.type === 'form' ? 'pro-form-item-form' : '']" v-bind="props">
		<slot></slot>
	</a-form-item>
</template>
<script lang="ts" setup>
import { formItemProps } from './form-item';
import { useFormItemStyle } from '../hooks';

const props = defineProps(formItemProps);

const { ns } = useFormItemStyle();
</script>

<style lang="less" scoped>
.pro-form-item {
	&-form {
		> :deep(.ant-form-item-control) {
			padding: 10px;
			background-color: rgb(0 0 0 / 5%);
		}
	}
}
</style>
