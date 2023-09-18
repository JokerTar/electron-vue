<template>
	<a-form-item :class="[ns.b()]">
		<slot></slot>
	</a-form-item>
</template>
<script lang="ts" setup>
import { useFormItemStyle } from '../hooks';

const { ns } = useFormItemStyle();
</script>
