import { useAppSelector } from '../common';
import { Block } from 'library/types/schedules';

import {
	selectDate,
	selectOpen,
	selectBusy,
	selectStatus,
	selectTimezone,
} from 'library/redux/schedules';
import { addMinutes, endOfDay, parseISO, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const useDay = () => {
	const date = useAppSelector((state) => selectDate(state, 'consultations'));
	const open = useAppSelector((state) => selectOpen(state, 'consultations'));
	const busy = useAppSelector((state) => selectBusy(state, 'consultations'));
	const status = useAppSelector((state) => selectStatus(state, 'consultations'));
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	const getSessions = (date: Date) => {
		let start = startOfDay(date);
		let end = endOfDay(date);
		let sessions = [];

		while (start < end) {
			let sessionStart = start;
			let sessionEnd = addMinutes(start, 30);
			sessions.push({ start: sessionStart, end: sessionEnd });
			start = addMinutes(start, 30);
		}

		return sessions;
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

	return {
		date,
		sessions: getSessions(date),
		getConsultation,
		getBusy,
		loadStatus: status,
	};
};

export default useDay;
