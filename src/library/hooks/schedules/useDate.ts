import { addDays, addMinutes, endOfDay, startOfDay, startOfWeek, formatISO } from 'date-fns';

type Props = {
	date: Date;
};

const useDate = ({ date }: Props) => {
	const getWeekDays = (date: Date) => {
		let start = startOfWeek(date, { weekStartsOn: 1 });
		let week: Date[] = [];
		for (let i = 0; i < 7; i++) {
			week.push(addDays(start, i));
		}
		return week;
	};

	const getHours = (date: Date) => {
		let start = startOfDay(date);
		let end = endOfDay(date);
		let hours: string[] = [];
		while (start < end) {
			hours.push(formatISO(start));
			start = addMinutes(start, 30);
		}
		return hours;
	};

	return {
		week: getWeekDays(date),
		hours: getHours(date),
	};
};

export default useDate;
