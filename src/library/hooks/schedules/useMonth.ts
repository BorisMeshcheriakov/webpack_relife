import React from 'react';

import {
	addDays,
	endOfMonth,
	endOfWeek,
	isEqual,
	parseISO,
	startOfDay,
	startOfMonth,
	startOfWeek,
} from 'date-fns';
import { selectDate, selectBusy, selectTimezone } from 'library/redux/schedules';

import { useAppSelector } from '../common';

import useDate from './useDate';
import { utcToZonedTime } from 'date-fns-tz';

const useMonth = () => {
	const date = useAppSelector((state) => selectDate(state, 'consultations'));
	const busy = useAppSelector((state) => selectBusy(state, 'consultations'));
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	const { week } = useDate({ date });

	const getCalendar = (date: Date) => {
		let start = startOfMonth(date);
		let end = endOfMonth(date);
		let calendarStart = startOfWeek(start, { weekStartsOn: 1 });
		let calendarEnd = endOfWeek(end, { weekStartsOn: 1 });
		let calendarDates = [];
		let calendarWithWeeks = [];

		// получаем все даты календаря
		while (calendarStart < calendarEnd) {
			calendarDates.push(calendarStart);
			calendarStart = addDays(calendarStart, 1);
		}

		// разбиваем даты по неделям
		for (let i = 0; i < calendarDates.length; i += 7) {
			const week = calendarDates.slice(i, i + 7);
			calendarWithWeeks.push(week);
		}

		return calendarWithWeeks;
	};

	const getSessions = React.useCallback(
		(date: Date) => {
			const busySessions = busy.filter((session) =>
				isEqual(startOfDay(utcToZonedTime(parseISO(session.start_time), tz)), startOfDay(date))
			);

			const onlineSessions = busySessions.filter((session) => session.type === 'ON');

			const offlineSessions = busySessions.filter((session) => session.type === 'OF');

			return {
				online: onlineSessions.length,
				offline: offlineSessions.length,
			};
		},
		[busy, tz]
	);

	return { week, month: getCalendar(date), getSessions };
};

export default useMonth;
