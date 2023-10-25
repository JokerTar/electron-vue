/**
 * @description: 递归查询label
 * @param {*} options
 * @param {*} val
 * @return {*}
 */
export function getOptionsLabel(options, val) {
	if (!options || !Array.isArray(options) || !options.length) return;
	return _getOptionsLabel(options);
	function _getOptionsLabel(options) {
		if (!options || !Array.isArray(options) || !options.length) return;
		let title;
		for (let i = 0; i < options.length; i++) {
			if (options[i].value === val) {
				title = options[i].label;
				break;
			} else if (options[i].children) {
				title = _getOptionsLabel(options[i].children);
				break;
			}
		}
		return title;
	}
}
