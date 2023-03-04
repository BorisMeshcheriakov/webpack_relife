import { ScheduleAddress } from 'library/models/schedules';
import { AddressForm } from 'library/types/schedules';

export const defaultAddressValue: AddressForm = {
	city: '',
	street: '',
	house: '',
	apartment: '',
	phone: '',
	note: '',
};

export const validAddress = (address: ScheduleAddress): string => {
	return (
		address &&
		(address.city ? `г. ${address.city}` : '') +
			(address.street ? `, ул. ${address.street}` : '') +
			(address.house ? `, д. ${address.house}` : '') +
			(address.apartment ? `, к. ${address.apartment}` : '')
	);
};

const findMaxOrder = (list: ScheduleAddress[]) => {
	return list.length
		? Number(list.reduce((prev, cur) => (+prev.order > +cur.order ? prev : cur)).order) + 1
		: 0;
};

export const normalizeScheduleAddress = (address: any, list: ScheduleAddress[]) => {
	let normalize = {
		order: findMaxOrder(list),
		city: address.address.city ?? '',
		street: address.address.street ?? '',
		house: address.address.house ?? '',
		apartment: address.address.apartment ?? '',
		phone: address.address.phone ?? '',
		note: address.address.note ?? '',
		visible: true,
	};
	return normalize;
};
