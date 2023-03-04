import { parseISO, startOfDay, endOfDay, addSeconds, differenceInDays } from 'date-fns';
import { Program, ProgramList } from 'library/models/programs';

const getDaysLeft = (program: Program | ProgramList) => {
	let daysLeft = 0;
	const { individual } = program;
	const { end_date } = individual || {};
	const now = new Date();

	if (end_date) {
		const days = differenceInDays(addSeconds(endOfDay(parseISO(end_date)), 1), startOfDay(now));
		daysLeft = days;
	}
	return daysLeft;
};

export default getDaysLeft;
