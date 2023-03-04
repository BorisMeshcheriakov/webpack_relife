import { parseISO, differenceInDays, startOfDay, endOfDay, addSeconds } from 'date-fns';
import { Program, ProgramList } from 'library/models/programs';

const getDuration = (program: Program | ProgramList) => {
	let duration = 0;
	const { individual } = program;
	const { start_date, end_date } = individual || {};
	if (start_date && end_date) {
		const days = differenceInDays(
			addSeconds(endOfDay(parseISO(end_date)), 1),
			startOfDay(parseISO(start_date))
		);
		duration = days;
	}
	return duration;
};

export default getDuration;
