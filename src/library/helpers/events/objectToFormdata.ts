const objToFormData = (obj: any, formData = new FormData()) => {
	const createFormData = function (obj: any, subKeyStr = '') {
		for (let i in obj) {
			let value = obj[i];
			let subKeyStrTrans = subKeyStr ? subKeyStr + '[' + i + ']' : i;

			if (typeof value === 'string') {
				formData.append(subKeyStrTrans, value);
			} else if (typeof value === 'number') {
				formData.append(subKeyStrTrans, value.toString());
			} else if (typeof value === 'object') {
				createFormData(value, subKeyStrTrans);
			}
		}
	};

	createFormData(obj);

	return formData;
};

export default objToFormData;
