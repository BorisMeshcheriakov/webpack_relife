import { parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { CoachAvailablePeriods } from 'library/models/schedules';

const canCreate = (
	session: CoachAvailablePeriods,
	openSessions: CoachAvailablePeriods[],
	tz: string
) => {
	const { start_time, end_time } = session;
	const intersectedSession = openSessions.find(
		(open) =>
			(parseISO(open.start_time) >= zonedTimeToUtc(parseISO(start_time), tz) &&
				parseISO(open.end_time) <= zonedTimeToUtc(parseISO(end_time), tz)) ||
			(parseISO(open.start_time) < zonedTimeToUtc(parseISO(end_time), tz) &&
				zonedTimeToUtc(parseISO(end_time), tz) <= parseISO(open.end_time))
	);

	return !!!intersectedSession;
};

export default canCreate;
