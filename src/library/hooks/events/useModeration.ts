import { useEffect } from 'react';
import { Event } from 'library/models/events';
import { useUser } from '../user';
import { usePublicate } from 'library/hooks/events';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../common';
import { openModerationModal, openNotifyModal } from 'library/redux/modal';

type Props = {
	event: Event | null;
	isAuthor?: boolean;
};

const useModeration = ({ event, isAuthor }: Props) => {
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const { publicate } = usePublicate();
	const { push } = useHistory();

	const showModeration = (): boolean => {
		return event?.author?.id === user?.user?.id;
	};
	const publicateEvent = () => {
		event?.id && publicate(event.id);
	};

	const editEvent = () => {
		event && push(`/events/${event.id}/edit`);
	};

	useEffect(() => {
		if (isAuthor && event?.moderation_status.abbr_status === 'D') {
			showModerationText();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [event?.id]);

	const showModerationText = () => {
		dispatch(
			openModerationModal({
				title: 'Модерация не пройдена',
				text: 'Внести изменения в мероприятия?',
				confirmText: 'Да',
				confirm: () => editEvent(),
				declineText: 'Нет',
				statusText: event?.moderation_status?.comment,
			})
		);
	};

	const showModerationStatus = () => {
		dispatch(
			openNotifyModal({
				title: 'Модерация',
				text: 'Осталось немного подождать. Наши специалисты проверяют программу',
				confirmText: 'Ок',
			})
		);
	};

	const getModerationClass = () => {
		return !event?.published
			? 'unpublished'
			: event?.moderation_status && event.moderation_status.abbr_status === 'N'
			? 'moderation'
			: event?.moderation_status && event.moderation_status.abbr_status === 'D'
			? 'failed'
			: '';
	};

	return {
		showModeration: showModeration(),
		publicateEvent,
		getModerationClass,
		showModerationStatus,
		showModerationText,
	};
};

export default useModeration;
