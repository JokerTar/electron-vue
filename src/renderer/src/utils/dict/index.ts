/**
 * 设置字典缓存
 *
 * @param key       参数键
 * @param dictDatas 字典数据列表
 */
export function setDictCache(key, dictDatas) {
	console.log(key, dictDatas);
	// .
}

/**
 * 获取字典缓存
 *
 * @param key 参数键
 * @return dictDatas 字典数据列表
 */
export function getDictCache(key) {
	console.log(key);
	// .
}

/**
 * 删除指定字典缓存
 *
 * @param key 字典键
 */
export function removeDictCache(key) {
	console.log(key);
	// .
}

/**
 * 清空字典缓存
 */
export function clearDictCache() {
	// .
}

/**
 * 请求字典库获取字典
 * @param code
 * @returns
 */
// function fetchDict(code): Promise<Dict[]> {
// 	const params = { key: code };
// 	return platformService.fetchDict(params).then((res) => {
// 		const { list }: any = res;
// 		const items = list?.map((item) => {
// 			return {
// 				label: item.name,
// 				value: item.code, // 字典值都为字符串类型
// 				isDefault: item.isDefault === '1', // 转化数值为boolean值，1是 2否
// 			};
// 		});
// 		setDictCache(code, items);
// 		cachePromiseMap.delete(code);
// 		return items;
// 	});
// }
