import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { eventService } from 'library/api/eventService';
import { useUser } from 'library/hooks/user';
import { useAppDispatch, useAppSelector } from '../common';
import { selectEvent, setSelectedEvent } from 'library/redux/events';
import { openNotifyModal } from 'library/redux/modal';

const useEvent = () => {
	const dispatch = useAppDispatch();
	const event = useAppSelector(selectEvent);
	const { id } = useParams<{ id: any }>();
	const { user } = useUser();
	const { push } = useHistory();

	// const [event, setEvent] = useState<Event>({} as Event);
	const [status, setStatus] = useState<string>('idle');
	const [isAuthor, setIsAuthor] = useState<boolean>(false);

	const errorEvent = () => {
		push(`/events`);
		dispatch(
			openNotifyModal({
				title: 'Мероприятие',
				text: 'Не удалось открыть мероприятие',
				confirmText: 'Ок',
			})
		);
	};

	const getEvent = useCallback(async () => {
		if (!id) {
			return;
		}

		setStatus('loading');
		try {
			const response = await eventService.getEvent(id);
			if (!response.data) {
				throw response;
			}
			// setEvent(response.data);
			setIsAuthor(user?.user?.id === response.data.author.id);
			dispatch(setSelectedEvent(response.data));
		} catch (error) {
			errorEvent();
		}
		setStatus('loaded');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, user?.user?.id, dispatch]);

	useEffect(() => {
		status === 'idle' && getEvent();
	}, [getEvent, status]);

	return {
		event,
		status,
		isAuthor,
	};
};

export default useEvent;
