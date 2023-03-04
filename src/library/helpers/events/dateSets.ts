import { ru } from 'date-fns/locale';
import { addDays, differenceInHours, format, formatDuration, isPast, parseISO } from 'date-fns';
import { Day } from 'library/models/events';
import normalizeTimetable from './normalizeTimetable';

export const getDate = (date: any): string => {
	return format(new Date(date), 'd MMMM yyyy', { locale: ru });
};

export const getDateStrict = (date: any): string => {
	return format(new Date(date), 'd MMMM', { locale: ru });
};

export const checkDate = (date: any): boolean => {
	return isPast(parseISO(date));
};

export const checkEventEnd = (date: any): boolean => {
	return isPast(addDays(parseISO(date), 1));
};

export const getTime = (date: any): string => {
	return format(new Date(date), 'HH:mm', { locale: ru });
};

export const getDuration = (table: Day[]) => {
	const normalDate = normalizeTimetable(table);
	let hours: number = 0;
	normalDate.forEach((item) => {
		hours += differenceInHours(item.time_to, item.time_from);
	});
	let days: number = Math.floor(hours / 24);
	hours = hours % 24;
	return hours
		? formatDuration({ days: days, hours: hours }, { format: ['days', 'hours'], locale: ru })
		: 'Менее 1 часа';
};
