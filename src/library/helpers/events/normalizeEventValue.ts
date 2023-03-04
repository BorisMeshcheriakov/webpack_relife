import { EventAddress } from 'library/models/events';
import { conformToMask } from 'react-text-mask';

export const getEventPlace = (address: EventAddress, country?:string): string => {
	return (
		address &&
    (country && `${country}, `) +
		(address.city ? `г. ${address.city}` : '') +
			(address.street ? `, ул. ${address.street}` : '') +
			(address.house ? `, д. ${address.house}` : '') +
			(address.unit ? `, к. ${address.unit}` : '') +
			(address.office ? `, офис ${address.office}` : '')
	);
};

const mask = ['+', /[1-9]/ , ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const getPhoneNumber = (number: string = '') => {
	return conformToMask(number, mask).conformedValue;
};
