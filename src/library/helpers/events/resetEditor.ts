import { Event } from 'library/models/events';
import { normalizeTimetable } from 'library/helpers/events';
import { parse, parseISO } from 'date-fns';

const resetEditor = (event: Event) => {
	return {
		cost: event.cost,
		discount: event.discount.map((discount) => ({
			...discount,
			discount_from: parse(discount.discount_from, 'yyyy-MM-dd', new Date()),
			discount_to: parse(discount.discount_to, 'yyyy-MM-dd', new Date()),
		})),
		places: event.places,
		title: event.title,
		description: event.description,
		time_from: parseISO(event.time_from),
		time_to: parseISO(event.time_to),
		mode: event.mode === 'O' ? 'O' : 'N',
		event_type: event.event_type,
		address: { ...event.address },
		event_coach: [...event.event_coach],
		event_block: [...event.event_block],
		event_image: event.event_image,
		timetable: event.timetable
			? normalizeTimetable(event.timetable)
			: [
					{
						time_from_day: new Date(),
						time_from: new Date(),
						time_to: new Date(),
					},
			  ],
		tag: event.tag.map((tag) => tag.pk),
		phone: event.phone,
		email: event.email,
		prepayment_cost: event.prepayment_cost,
	};
};

export default resetEditor;
