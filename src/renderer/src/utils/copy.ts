// import { message } from 'ant-design-vue';

export function copy(val: string) {
	if (!val) return console.warn('没有需要复制的目标内容');
	// 创建textarea标签
	const textarea = document.createElement('textarea');
	// 设置相关属性
	// textarea.readOnly = 'readonly';
	textarea.style.position = 'fixed';
	textarea.style.top = '-99999px';
	// 把目标内容赋值给它的value属性
	textarea.value = val;
	// 插入到页面
	document.body.appendChild(textarea);
	// 调用onselect()方法
	textarea.select();
	// 把目标内容复制进剪贴板, 该API会返回一个Boolean
	const res = document.execCommand('Copy');
	res && console.log('复制成功，剪贴板内容：' + val);
	// res && message.success('复制成功');
	// 移除textarea标签
	document.body.removeChild(textarea);
}
