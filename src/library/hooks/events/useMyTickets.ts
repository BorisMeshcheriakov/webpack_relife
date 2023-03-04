import React from 'react';
import { eventService } from 'library/api/eventService';
import { useHistory, useParams } from 'react-router-dom';
import { TicketDetail } from 'library/models/events';
import { useUser } from 'library/hooks/user';
import { openAuthModal } from 'library/redux/modal';
import { useAppDispatch } from '../common';
import useWindowDimensions from '../common/useWindowDimensions';

const useMyTickets = () => {
	const dispatch = useAppDispatch();
	const [tickets, setTickets] = React.useState<TicketDetail[]>([]);
	const [status, setStatus] = React.useState('idle');
	const { id } = useParams<{ id: string }>();
	const { push } = useHistory();
	const { isAuth } = useUser();
	const { width } = useWindowDimensions();
	const showCloseBtn = width <= 1024;

	const getTickets = React.useCallback(async () => {
		setStatus('loading');
		try {
			const response = await eventService.getTicketsList(id);
			if (!response.data) {
				throw response;
			}

			setTickets(response.data);
		} catch (error) {
			// console.log(error);
		}
		setStatus('loaded');
	}, [id]);

	React.useEffect(() => {
		isAuth && status === 'idle' && getTickets();
	}, [getTickets, status, isAuth]);

	const onClose = () => {
		push(`/events/${id}`);
	};

	const onBuy = () => {
		isAuth ? push(`/events/${id}/buy`) : dispatch(openAuthModal());
	};

	return {
		tickets,
		status,
		onClose,
		onBuy,
		isAuth,
		showCloseBtn,
	};
};

export default useMyTickets;
