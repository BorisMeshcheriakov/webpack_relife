import { ScheduleAddress } from 'library/models/schedules';

const addressString = (address: ScheduleAddress) => {
	if (!address) return '';
	let addr = [];

	if (address.city) addr.push(`г. ${address.city}`);
	if (address.street) addr.push(`ул. ${address.street}`);
	if (address.house) addr.push(`кв. ${address.house}`);

	return addr.join(', ');
};

export default addressString;
