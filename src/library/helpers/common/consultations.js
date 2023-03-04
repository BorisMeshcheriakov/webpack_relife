/* eslint-disable */

export const statusText = (status) => {
	const getText = (status) => {
		switch (status) {
			case 'ON':
				return 'Онлайн';
			case 'OF':
				return 'Оффлайн';
			default:
				break;
		}
	};

	return getText(status);
};

export const literalDuration = (duration) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	const getHours = (hours) => {
		if (hours) {
			if ((hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)) {
				return `${hours} часа`;
			} else if (hours === 1 || hours === 21) {
				return `${hours} час`;
			} else {
				return `${hours} часов`;
			}
		} else {
			return '';
		}
	};

	const getMinutes = (minutes) => {
		if (minutes) {
			if (minutes % 10 >= 2 && minutes % 10 <= 4) {
				return `${minutes} минуты`;
			} else if (minutes % 10 === 1) {
				return `${minutes} минута`;
			} else {
				return `${minutes} минут`;
			}
		} else {
			return '';
		}
	};

	return `${getHours(hours)} ` + `${getMinutes(minutes)}`;
};

export const usernameConstructor = (user = {}, style) => {
	// style === long - ФИО полностью, short - фамилия и инициалы

	const params = ['last_name', 'first_name', 'middle_name'];
	let name = [];
	for (const param of params) {
		if (style === 'short') {
			user.hasOwnProperty(param) &&
				name.push(param !== 'last_name' ? `${user[param].slice(0, 1)}.` : user[param]);
		} else if (style === 'long') {
			user.hasOwnProperty(param) && name.push(user[param]);
		}
	}

	return name.join(' ');
};

export const addressToString = (address) => {
	const params = ['city', 'street', 'house', 'apartment'];
	let addressArr = [];
	for (const param of params) {
		if (address && address[param] !== null) {
			switch (param) {
				case 'city':
					addressArr.push(`г. ${address[param]}`);
					break;
				case 'street':
					addressArr.push(`ул. ${address[param]}`);
					break;
				case 'house':
					addressArr.push(`д. ${address[param]}`);
					break;
				case 'apartment':
					addressArr.push(`кв. ${address[param]}`);
					break;
				default:
					break;
			}
		}
	}
	return addressArr.join(', ');
};

export const minutesInSession = (duration) => {
	if (isNaN(duration)) {
		return;
	}

	return parseFloat(duration) * 60;
};
