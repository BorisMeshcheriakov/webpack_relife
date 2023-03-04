import { FC } from 'react';
import { icons } from 'resources/icons/events/EventDescription/index';
import { Event } from 'library/models/events';
import { getDate, getTime, getDuration } from 'library/helpers/events/dateSets';
import { Description } from './frames';
import { getDiscountCard } from 'library/helpers/events/discount';
import { getEventPlace, getPhoneNumber } from 'library/helpers/events/normalizeEventValue';

interface Props {
	event: Event | null;
	size: 'large' | 'small';
	type: 'type' | 'date' | 'time' | 'cost' | 'place' | 'duration' | 'typeMeeting' | 'phone';
}

const EventDescription: FC<Props> = ({ event, size, type }) => {
	return (
		<>
			{type === 'type' && (
				<Description
					title={event?.event_type ?? ''}
					size={size}
					svg={event?.mode === 'O' ? icons.ofline : icons.online}
				/>
			)}

			{type === 'typeMeeting' && (
				<Description
					title={event?.mode === 'O' ? event.address.city : 'Онлайн'}
					size={size}
					svg={event?.mode === 'O' ? icons.location : icons.online1}
				/>
			)}

			{type === 'place' && (
				<Description
					title={event?.mode === 'O' ? getEventPlace(event.address) : 'Онлайн'}
					size={size}
					svg={event?.mode === 'O' ? icons.location : icons.online1}
				/>
			)}

			{type === 'duration' && !!event?.timetable?.length && (
				<Description title={getDuration(event.timetable)} size={size} svg={icons.duration} />
			)}

			{type === 'cost' && (
				<Description
					title={(event?.cost && getDiscountCard(event.discount, event.cost)) ?? ''}
					size={size}
					svg={icons.cost}
				/>
			)}
			{type === 'date' && (
				<Description title={getDate(event?.time_from)} size={size} svg={icons.date} />
			)}

			{type === 'time' && (
				<Description title={getTime(event?.time_from)} size={size} svg={icons.time} />
			)}

			{type === 'phone' && (
				<Description title={getPhoneNumber(event?.phone)} size={size} svg={icons.time} />
			)}
		</>
	);
};

export default EventDescription;
