import { differenceInYears, parse } from 'date-fns';
import { ClientList } from 'library/models/clients';
import { User } from 'library/models/users';
import { Client } from 'library/types/cart';

export const getInitial = (
	firstName: string = '',
	midleName: string = '',
	lastName: string = ''
): string => {
	return `${lastName} ${firstName[0] + '.'}${midleName && midleName[0] + '.'}`;
};

export const getFullName = (user: User | Client | ClientList) => {
	return `${user.last_name} ${user.first_name} ${user.middle_name && user.middle_name}`;
};

export const getName = (user: User | Client | ClientList) => {
	return `${user.last_name} ${user.first_name}`;
};

export const getCurrentAge = (date: string) => {
	let birthDate = parse(date, 'yyyy-MM-dd', new Date());
	let age = differenceInYears(new Date(), birthDate);
	let txt = '';

	if (age >= 5 && age <= 20) {
		txt = 'лет';
	} else {
		age = age % 10;
		if (age === 1) {
			txt = 'год';
		} else if (age >= 2 && age <= 4) {
			txt = 'года';
		} else {
			txt = 'лет';
		}
	}

	return `${age} ${txt}`;
};

export const getGender = (gender: string) => {
	if (gender === 'm') {
		return 'муж';
	} else if (gender === 'f') {
		return 'жен';
	}
};
