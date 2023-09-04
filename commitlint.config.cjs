/* eslint-disable prettier/prettier */
/**
 * commitlint 配置
 * @description 主要用于git commit消息检查
 * @example
 * 格式：
 *    <type>(<scope>): <subject>
 *    空一行
 *    [body]
 *    空一行
 *    [footer]
 *
 * type: 提交类型，必须
 * scope: 变更范围，可选
 * subject: 变更简述，必须
 *
 */
module.exports = {
	ignores: [(commit) => commit.includes('init')],
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [2, 'always', 108], // 标题（<type>(<scope>): <subject>）最大长度为108字符
		'body-leading-blank': [2, 'always'], // 以空行后编写[body]
		'footer-leading-blank': [1, 'always'], // 以空行后编写[footer]
		'subject-empty': [2, 'never'], // 变更描述不能为空
		'subject-case': [0], // 禁用变更描述格式校验
		'type-empty': [2, 'never'], // 提交类型不能空
		'type-enum': [
			// 提交类型枚举列表
			2,
			'always',
			[
				'workflow', // 工作流
				'release', // 发布版本
				'feat', // 新增特性*
				'fix', // 修复bug*
				'perf', // 性能优化
				'refactor', // 重构代码
				'docs', // 文档更新
				'deps', // 依赖相关修改
				'revert', // 回滚某个之前的提交
				'wip', // 持续开发特性（未完成）
				'test', // 新增测试用例或者更新测试
				'style', // 不影响程序逻辑的代码修改（修改空白字符，补全缺失的分号等）
				'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup，vue-cli 的配置等)的提交
				'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
				'chore', // 其他，不属于以上类型的其他类型（日常事务）
			],
		],
	},
};
