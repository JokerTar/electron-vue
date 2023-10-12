/*
 * @Author: Canz
 * @Date: 2022-03-29 15:06:37
 * @LastEditors: TRF
 * @LastEditTime: 2023-10-12 15:18:39
 * @Description:  By接口签名加密算法工具函数
 */

import MD5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8';
import PadPkcs7 from 'crypto-js/pad-pkcs7';
import EncBase64 from 'crypto-js/enc-base64';
import { secretKey } from '@/settings';
// const secretKey = 's39fbttba0fb3f2p';

/**
 * Base64 Encode 函数
 * @param {*} str
 * @returns
 */
export function base64Encode(str) {
	return EncBase64.stringify(EncUtf8.parse(str));
}
/**
 * Base64 Decode 函数
 * @param {*} str
 * @returns
 */
export function base64Decode(str) {
	return EncUtf8.stringify(EncBase64.parse(str));
}
/**
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function getUid(len = 32, firstU = true, radix = null) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	const uuid = [];
	radix = radix || chars.length;

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
	} else {
		let r;
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16);
				uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstU) {
		uuid.shift();
		return `u${uuid.join('')}`;
	}
	return uuid.join('');
}
/**
 * 加密字符串
 * @param {String} message 需要加密的原始字符串
 * @param {String} key 密钥
 * @returns 加密字符串
 */
export function encryptAES(message, key = secretKey) {
	const ivString = getUid(16);
	const iv = EncUtf8.parse(ivString);
	// 加密方式：AES-128-CBC
	const encrypted = AES.encrypt(message, EncUtf8.parse(key), {
		iv: iv,
		// mode: CryptoJS.mode.CBC,
		padding: PadPkcs7,
	});
	const r = base64Encode(`${ivString}${encrypted.toString()}`);
	// console.log('加密内容', message, key);
	// console.log('加密结果', r);
	// console.log('解密结果', decryptAES(r, key));
	return r;
}

/**
 * 获取验签参数
 * @param {String} key 密钥
 * @returns 验签参数
 */
export function getSignParam(key = secretKey) {
	// 所有 需要参数的键值对保存到对象
	const resultObj = {};

	// 所有参数的 key 保存到数组
	// const paramsArr = []

	const timestamp = Date.now();
	const nonce = getUid(8);
	const stringA = ['nonce', 'timestamp'];
	resultObj.nonce = nonce;
	resultObj.timestamp = timestamp;

	// stringA = stringA.concat(paramsArr)

	stringA.sort((pre, next) => {
		return pre > next ? 1 : -1;
	});

	let resultStr = stringA
		.map((itemKey) => {
			return `${itemKey}=${encodeURIComponent(resultObj[itemKey])}`;
		})
		.join('&');

	resultStr = MD5(`${resultStr}&secretkey=${key}`).toString().toUpperCase();
	const sign = encryptAES(resultStr, key);
	return {
		Timestamp: timestamp,
		Nonce: nonce,
		Sign: sign,
	};
}
/**
 * AES 解密函数
 * @param {*} str 需要解密的加密字符串
 * @param {*} key 密钥
 * @returns 解密后的字符串
 */
export function decryptAES(str, key = secretKey) {
	// Base64 Decode
	const base64DecodeString = base64Decode(str);

	const ivString = base64DecodeString.slice(0, 16);
	const iv = EncUtf8.parse(ivString);

	const encryptedString = base64DecodeString.slice(16);
	const decrypted = AES.decrypt({ ciphertext: EncBase64.parse(encryptedString) }, EncUtf8.parse(key), {
		iv: iv,
		// mode: CryptoJS.mode.CBC,
		padding: PadPkcs7,
	});
	const decryptedString = decrypted.toString(EncUtf8);

	return decryptedString;
}
