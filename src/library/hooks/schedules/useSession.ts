import { addDays, differenceInMinutes, isEqual, parseISO, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Statuses, Part, Overlap } from 'library/helpers/schedules';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { selectMockByDate, selectTimezone } from 'library/redux/schedules';
import { Calendar, ModeCode } from 'library/types/schedules';
import { useAppSelector } from '../common';

const useSession = (
	start: Date,
	end: Date,
	consultation: CoachAvailablePeriods | undefined,
	busy: OriginSchedule | undefined,
	canUpdate: boolean,
	mode: ModeCode,
	calendar: Calendar
) => {
	const mock = useAppSelector((state) => selectMockByDate(state, start, end));
	const tz = useAppSelector((state) => selectTimezone(state, calendar));

	const getBlockStatus = () => {
		let status = Statuses.empty;
		if (busy) {
			if (busy.payment_status === 'success' && !busy.changing_time_process.flag) {
				status = Statuses.busy;
			} else {
				status = Statuses.unconfirmed;
			}

			if (busy.consultation_cancelled) {
				status = Statuses.unconfirmed;
			}

			// TODO cancelled status
		} else {
			if (mock && consultation && consultation.id) {
				status = canUpdate && mock.status.length > 1 ? Statuses.update : Statuses.remove;
			} else {
				status = consultation ? Statuses.open : mock ? Statuses.create : Statuses.empty;
			}
		}

		return status;
	};

	const getPart = () => {
		let position = Part.single;

		let session: { start_time: Date; end_time: Date } | undefined;

		if (consultation) {
			const { start_time, end_time } = consultation;
			session = {
				start_time: utcToZonedTime(parseISO(start_time), tz),
				end_time: utcToZonedTime(parseISO(end_time), tz),
			};
		} else if (mock) {
			const { start_time, end_time } = mock;
			session = { start_time: parseISO(start_time), end_time: parseISO(end_time) };
		}

		if (session) {
			const { start_time, end_time } = session;

			if (differenceInMinutes(end_time, start_time) <= 30) {
				position = Part.single;
			} else if (isEqual(start, start_time) && end < end_time) {
				position = Part.start;
			} else if (isEqual(end, end_time) && start > start_time) {
				position = Part.end;
			} else if (start > start_time && end < end_time) {
				position = Part.middle;
			}
		}

		return position;
	};

	const overlap = () => {
		let overlap = Overlap.none;
		let session: { start_time: Date; end_time: Date } | undefined;

		if (consultation) {
			const { start_time, end_time } = consultation;
			session = { start_time: parseISO(start_time), end_time: parseISO(end_time) };
		} else if (mock) {
			const { start_time, end_time } = mock;
			session = { start_time: parseISO(start_time), end_time: parseISO(end_time) };
		}

		if (session) {
			const { start_time, end_time } = session;
			const currentDayStart = startOfDay(start);
			const nextDayStart = addDays(currentDayStart, 1);
			if (currentDayStart > start_time && isEqual(currentDayStart, start)) {
				overlap = Overlap.top;
			} else if (end_time > nextDayStart && isEqual(nextDayStart, end)) {
				overlap = Overlap.bottom;
			}
		}

		return overlap;
	};

	const isActive = () => {
		let active = false;

		if (!busy && calendar === 'editor') {
			if (consultation) {
				active = !!consultation.status.find((stat) => stat === mode);
			}
		}

		return active;
	};

	const isConfirmed = () => {
		let confirmed = false;
		if (busy) {
			confirmed = busy.payment_status === 'success' && !busy.changing_time_process.flag;
		}
		return confirmed;
	};

	const isNow = (start: Date, end: Date, consultation?: CoachAvailablePeriods) => {
		let now = false;
		const current = new Date();

		if (consultation) {
			const consultationStart = parseISO(consultation.start_time);
			const consultationEnd = parseISO(consultation.end_time);

			now = consultationStart <= current && current <= consultationEnd;
		} else {
			now = start <= current && current <= end;
		}
		return now;
	};

	return {
		mock,
		status: getBlockStatus(),
		part: getPart(),
		overlap: overlap(),
		isActive: isActive(),
		isConfirmed: isConfirmed(),
		isNow: isNow(start, end, consultation),
	};
};

export default useSession;
