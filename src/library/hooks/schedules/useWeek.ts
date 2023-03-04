import React from 'react';
import {
	addMockSession,
	selectBusy,
	selectDate,
	selectMode,
	selectOpen,
	selectStatus,
	selectTimezone,
} from 'library/redux/schedules';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { addDays, addMinutes, endOfDay, parseISO, startOfDay, startOfWeek } from 'date-fns';
import { Block, Calendar } from 'library/types/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';
import useDate from './useDate';
import { utcToZonedTime } from 'date-fns-tz';

const useWeek = ({ calendar }: { calendar: Calendar }) => {
	const dispatch = useAppDispatch();
	const date = useAppSelector((state) => selectDate(state, calendar));
	const open = useAppSelector((state) => selectOpen(state, calendar));
	const busy = useAppSelector((state) => selectBusy(state, calendar));
	const status = useAppSelector((state) => selectStatus(state, calendar));
	const settings = useAppSelector(selectConsultationSettings);
	const mode = useAppSelector(selectMode);
	const tz = useAppSelector((state) => selectTimezone(state, calendar));

	const { week, hours } = useDate({ date });

	const getSessions = (date: Date) => {
		let start = startOfWeek(date, { weekStartsOn: 1 });
		let dates: Date[] = [];
		for (let i = 0; i < 7; i++) {
			dates.push(addDays(start, i));
		}
		let daysWithSessions = dates.map((day) => {
			let sessions = [];
			let start = startOfDay(day);
			let end = endOfDay(day);
			while (start < end) {
				let sessionStart = start;
				let sessionEnd = addMinutes(start, 30);
				sessions.push({ start: sessionStart, end: sessionEnd });
				start = addMinutes(start, 30);
			}
			return sessions;
		});
		return daysWithSessions;
	};

	const clearMock = () => {
		dispatch(addMockSession(null));
	};

	const getConsultation = (block: Block) => {
		const { start, end } = block;
		return open.find((consultation) => {
			return (
				utcToZonedTime(parseISO(consultation.start_time), tz) <= start &&
				utcToZonedTime(parseISO(consultation.end_time), tz) >= end
			);
		});
	};

	const getBusy = (block: Block) => {
		const { start, end } = block;
		return busy.find((consultation) => {
			return (
				utcToZonedTime(parseISO(consultation.start_time), tz) <= start &&
				utcToZonedTime(parseISO(consultation.end_time), tz) >= end
			);
		});
	};

	const canUpdate = React.useCallback(() => {
		let update = false;
		if (settings) {
			update = settings['ON'].duration === settings['OF'].duration;
		}
		return update;
	}, [settings]);

	return {
		week,
		hours,
		sessions: getSessions(date),
		clear: clearMock,
		open,
		getConsultation,
		getBusy,
		canUpdate: canUpdate(),
		mode,
		status,
	};
};

export default useWeek;
