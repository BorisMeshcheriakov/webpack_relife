export function formatName(lastName, firstName, middleName) {
	let str = lastName;

	if (firstName) {
		str = str.concat(` ${firstName[0]}.`);
	}

	if (firstName && middleName) {
		str = str.concat(` ${middleName[0]}.`);
	}

	return str;
}

export function numberWithSeparator(value, char = ' ') {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, char);
}

export function parseGetParam(url, key) {
	var newUrl = new URL(url);
	var value = newUrl.searchParams.get(key);
	return value;
}

export function firstToUpper(str) {
	if (!str.length) {
		return '';
	}
	return str[0].toUpperCase() + str.slice(1);
}
