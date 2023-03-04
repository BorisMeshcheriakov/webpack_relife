import React from 'react';
import qs from 'query-string';

import { eventService } from 'library/api/eventService';
import { TicketDetail } from 'library/models/events';
import { useParams } from 'react-router-dom';

const useSoldTickets = () => {
	const { id } = useParams<{ id: string }>();
	const [count, setCount] = React.useState<number>(0);
	const [tickets, setTickets] = React.useState<TicketDetail[]>([]);

	React.useEffect(() => {
		const getTickets = async () => {
			try {
				const params = qs.stringify({ event: id });
				const response = await eventService.getTickets(params);
				setTickets(response.data.results);
				setCount(response.data.count);
			} catch (error) {
				// console.log(error);
			}
		};

		getTickets();
	}, [id]);

	return {
		tickets,
		count,
	};
};

export default useSoldTickets;
