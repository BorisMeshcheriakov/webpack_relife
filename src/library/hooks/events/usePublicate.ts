import { useAppDispatch } from 'library/hooks/common';
import { changeEvent, patchEvent } from 'library/redux/events';

import { eventService } from 'library/api/eventService';

import { openDialogModal, openNotifyModal } from 'library/redux/modal';
// import { AxiosError } from 'axios';

/**
 * TODO Вывод сообщений об ошибках
 */

const usePublicate = () => {
	const dispatch = useAppDispatch();

	const updateEvent = async (id: number, data: { published?: boolean; favorite?: boolean }) => {
		dispatch(patchEvent({ id: id, data }));
	};

	const sendEvent = async (id: number, published: boolean) => {
		try {
			updateEvent(id, { published });
			const response = await eventService.publicateEvent(id, published);
			dispatch(changeEvent(response.data));
			if (!response.data) {
				throw response;
			}

			if (published) {
				dispatch(
					openNotifyModal({
						title: 'Модерация',
						text: 'Мероприятие отправлено на модерацию',
						confirmText: 'Ок',
					})
				);
			}
		} catch (error) {
			// const err = error as AxiosError;
			// console.log(err);
		}
	};

	const publicate = (id: number) => {
		const published = true;
		dispatch(
			openDialogModal({
				title: 'Публикация',
				text: 'Мероприятие будет отправлено на модерацию. Продолжить?',
				confirmText: 'Да',
				confirm: () => sendEvent(id, published),
				declineText: 'Нет',
				link: {
					url: '',
					text: 'Подробнее о публикации',
				},
			})
		);
	};

	const unpublicate = (id: number) => {
		const published = false;
		dispatch(
			openDialogModal({
				title: 'Снятие с публикации',
				text: 'Вы действительно хотите снять мероприятие с публикации?',
				confirmText: 'Да',
				confirm: () => sendEvent(id, published),
				declineText: 'Нет',
			})
		);
	};

	return {
		publicate,
		unpublicate,
		sendEvent,
	};
};

export default usePublicate;
