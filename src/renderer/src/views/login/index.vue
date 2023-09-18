<template>
	<div class="login-container">
		<div class="login-main">
			<div class="login-left">
				<p>欢迎使用xxx</p>
			</div>
			<div class="login-right">
				<div>
					<a-checkbox v-model:checked="checked" style="margin-bottom: 40px">记住密码</a-checkbox>
					<a-button style="width: 100%" type="primary" @click="handleLogin">登录</a-button>
				</div>
				<div class="login-main-other"></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@renderer/store/modules/user';
import * as userServices from '@renderer/services/user';
import router from '@renderer/router';
import { homePath } from '@renderer/settings';

const checked = ref(false);
const captchaRef = ref();
const { login, getInfo } = useUserStore();

onMounted(async () => {
	const result = await userServices.captcha({});
	console.log(result);
	captchaRef.value = result?.captcha;
});

const user = ref();

const handleLogin = async () => {
	const params: Record<string, any> = {};
	console.log(params);
	await login({ username: '15712139076', password: '12345678', captcha: 'esse', key: 'in exercitation' });
	await getInfo();
	router.push(homePath);
};

console.log(user);
</script>

<style lang="less">
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: auto;
	height: 100%;
	background: #f0f2f5;
	flex: 1;
	flex-direction: column;
	padding-inline: 32px;
	padding-block: 24px;

	.login-main {
		display: flex;
		padding: 24px;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 6px;

		.login-right {
			min-width: 228px;
			max-width: 380px;
		}

		.login-left {
			min-width: 200px;
			max-width: 280px;
		}
	}
}
</style>
