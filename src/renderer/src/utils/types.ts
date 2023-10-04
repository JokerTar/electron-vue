const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);
export const isModelListener = (key: string) => key.startsWith('onUpdate:');
export const extend = Object.assign;
export const remove = <T>(arr: T[], el: T): void => {
	const i = arr.indexOf(el);
	if (i > -1) {
		arr.splice(i, 1);
	}
};
export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol): key is never => hasOwnProperty.call(val, key);
export const isArray = Array.isArray;
export const isMap = (val: unknown) => toTypeString(val) === '[object Map]';
export const isSet = (val: unknown) => toTypeString(val) === '[object Set]';
export const isDate = (val: unknown) => toTypeString(val) === '[object Date]';
export const isRegExp = (val: unknown) => toTypeString(val) === '[object RegExp]';
export const isNull = (val: unknown) => toTypeString(val) === '[object Null]';
export const isUndefined = (val: unknown) => toTypeString(val) === '[object Undefined]';
export const isNullOrUnDef = (val: unknown) => isNull(val) || isUndefined(val);
export const isFunction = (val: unknown) => typeof val === 'function';
export const isString = (val: unknown) => typeof val === 'string';
export const isNumber = (val: unknown) => typeof val === 'number';
export const isSymbol = (val: unknown) => typeof val === 'symbol';
export const isBoolean = (val: unknown) => typeof val === 'boolean';
export const isObject = (val: unknown) => val !== null && typeof val === 'object';
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
	// @ts-ignore
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string => objectToString.call(value);
export const toRawType = (value: unknown): string => {
	// extract "RawType" from strings like "[object RawType]"
	return toTypeString(value).slice(8, -1);
};
/**
 * "123-foo" will be parsed to 123
 * This is used for the .number modifier in v-model
 */
export const looseToNumber = (val: any): any => {
	const n = parseFloat(val);
	return isNaN(n) ? val : n;
};
/**
 * Only conerces number-like strings
 * "123-foo" will be returned as-is
 */
export const toNumber = (val: any): any => {
	const n = isString(val) ? Number(val) : NaN;
	return isNaN(n) ? val : n;
};

export const isEmpty = (obj: any) => {
	if (typeof obj === 'undefined' || obj === null || obj === '' || obj === '0' || obj === false || obj === 0 || (isArray(obj) && obj.length === 0)) {
		return true;
	} else {
		return false;
	}
};

export const isEmptyVariableInDefault = <T = any>(variable: any, defaultValue: any = undefined): T => {
	return variable === undefined || variable === null ? defaultValue : variable;
};

export const isEmptyDoubleVariableInDefault = <T = any>(variable1: any, variable2: any, defaultValue: any = undefined): T => {
	return isEmptyVariableInDefault(variable1, isEmptyVariableInDefault(variable2, defaultValue));
};

export const isExternal = (path: string) => {
	return /^(https?:|mailto:|tel:)/.test(path);
};
