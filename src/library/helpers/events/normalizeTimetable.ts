import { EventDay } from 'library/types/events';
import { Day } from 'library/models/events';

import { getHours, getMinutes, parse, setHours, setMinutes } from 'date-fns';

const normalizeTimetable = (table: Day[]) => {
	let timetable: EventDay[] = [];

	timetable = table?.map((day) => {
		let date = parse(day.date, 'dd.MM.yyyy', new Date());
		let startHours = getHours(parse(day.time_from, 'HH:mm', new Date()));
		let startMinutes = getMinutes(parse(day.time_from, 'HH:mm', new Date()));
		let endHours = getHours(parse(day.time_to, 'HH:mm', new Date()));
		let endMinutes = getMinutes(parse(day.time_to, 'HH:mm', new Date()));
		let from = setMinutes(setHours(date, startHours), startMinutes);
		let to = setMinutes(setHours(date, endHours), endMinutes);
		return {
      time_from_day: from,
			time_from: from,
			time_to: to,
		};
	});
	return [...timetable];
};

export default normalizeTimetable;
