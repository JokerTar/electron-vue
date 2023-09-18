import { isObject, isFunction } from '../index';

export const coverEvent = (target?: Record<string, any>, ...inheritArgs) => {
	if (!target) return;

	const stack = [target];
	while (stack.length > 0) {
		const obj = stack.pop();
		if (isObject(obj)) {
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					const val = obj[key];
					if (isObject(val) && !isFunction(val)) {
						stack.push(val);
					} else if (Array.isArray(val)) {
						val.forEach((item) => {
							if (isObject(item)) {
								stack.push(item);
							}
						});
					} else if (isObject(val) && isFunction(val)) {
						obj[key] = (...args) => {
							inheritArgs.forEach((item) => {
								if (!args.includes(item)) {
									return val(...args, item);
								} else {
									return val(...args);
								}
							});
						};
					}
				}
			}
		}
	}

	return target;
};
