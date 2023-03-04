import { isToday, addMinutes } from 'date-fns';

const isNow = (date: Date) => {
	let now = false;
	if (isToday(date)) {
		let current = new Date();
		let end = addMinutes(date, 30);
		now = date <= current && current <= end;
	}
	return now;
};

export default isNow;
