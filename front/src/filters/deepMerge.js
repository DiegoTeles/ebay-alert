/**
 * Deep merge objeect
 *
 * @returns {object}
 */
export const deepMerge = (target, source) => {
	for (let key of Object.keys(source)) {
		if (source[key] instanceof Object && !source[key].hasOwnProperty("length")) {
			Object.assign(source[key], deepMerge(target[key] || {}, source[key]));
		}
	}

	Object.assign(target || {}, source);

	return target;
};
