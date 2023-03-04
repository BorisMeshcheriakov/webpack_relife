import { toBase64 } from 'library/helpers/events';
import { FormEditor } from 'library/types/events';
import { format } from 'date-fns';

const normalizeEvent = async (event: FormEditor) => {
	let data = {
		...event,
		event_image:
			event.event_image instanceof FileList && event.event_image.length
				? await toBase64(event.event_image.item(0))
				: undefined,
		prepayment_cost: event.mode === 'O' ? event.prepayment_cost : undefined,
		address:
			event.mode === 'O'
				? {
						...event.address,
						image1:
							event.address?.image1 instanceof FileList && event.address.image1.length
								? await toBase64(event.address?.image1.item(0))
								: undefined,
						image2:
							event.address?.image2 instanceof FileList && event.address.image2.length
								? await toBase64(event.address.image2.item(0))
								: undefined,
						image3:
							event.address?.image3 instanceof FileList && event.address.image3.length
								? await toBase64(event.address.image3.item(0))
								: undefined,
				  }
				: undefined,

		event_coach: event.event_coach?.length
			? await Promise.all(
					event.event_coach.map(async (coach) => {
						return {
							...coach,
							photo:
								coach.photo instanceof FileList ? await toBase64(coach.photo.item(0)) : undefined,
						};
					})
			  )
			: [],
		event_block: event.event_block?.length
			? await Promise.all(
					event.event_block.map(async (block) => {
						return {
							...block,
							image:
								block.image instanceof FileList ? await toBase64(block.image.item(0)) : undefined,
						};
					})
			  )
			: [],
		discount: event.discount.map((discount) => {
			return {
				...discount,
				discount_from: format(discount.discount_from!, 'yyyy-MM-dd'),
				discount_to: format(discount.discount_to!, 'yyyy-MM-dd'),
			};
		}),
		time_from: event.timetable && event.timetable[0].time_from.toISOString(),
		time_to: event.timetable[event.timetable.length - 1].time_to!.toISOString(),
		timetable: event.timetable?.map((day) => {
			return {
				date: format(day.time_from!, 'dd.MM.yyyy'),
				time_from: format(day.time_from!, 'HH:mm'),
				time_to: format(day.time_to!, 'HH:mm'),
			};
		}),
	};

	data.tag && delete data.tag;

	return data;
};

export default normalizeEvent;
