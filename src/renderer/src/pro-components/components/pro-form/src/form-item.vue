<template>
	<a-form-item :class="[ns.b()]">
		<slot></slot>
	</a-form-item>
</template>
<script lang="ts" setup>
import { useFormItemStyle } from '../hooks';

// console.log('inject', inject('a1'));
// console.log('f1', inject('f1'));
// console.log(a1);
// console.log(f1);

const { ns } = useFormItemStyle();
</script>
