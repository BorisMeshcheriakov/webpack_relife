import { useAppDispatch } from 'library/hooks/common';
import { removeEvent } from 'library/redux/events';
import { openDialogModal, showPopup } from 'library/redux/modal';

import { eventService } from 'library/api/eventService';
import { useHistory } from 'react-router-dom';
import useVisitors from './useVisitors';

// import { AxiosError } from 'axios';

const useDelete = (id: string) => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { getTicketList } = useVisitors();

	const remove = async (id: number | string) => {
		let message = 'Вы успешно удалили мероприятие';
		let messageType: 'success' | 'error' = 'success';
		try {
			dispatch(removeEvent(+id));
			const response = await eventService.deleteEvent(id);
			if (response.status !== 204) {
				throw response;
			}
			push(`/events`);
		} catch (e) {
			console.error(e);
			messageType = 'error';
			message = 'Не удалось удалить мероприятие';
		}

		dispatch(showPopup({ type: messageType, text: message }));
	};

	const deleteEvent = async (id: number | string) => {
		let message =
			'Если вы удалите мероприятие, деньги за купленные билеты будут возвращены клиентам.';
		let ticketsNumber = 0;

		// Проверяем наличие билетов перед удалением
		try {
			const response = await getTicketList(id);
			if (!response.data) {
				throw response;
			}
			ticketsNumber = response.data.count;

			if (ticketsNumber <= 0) {
				message = 'Вы действительно хотите удалить мероприятие?';
			}
		} catch (error) {
			console.error(error);
		}

		dispatch(
			openDialogModal({
				title: 'Удаление мероприятия',
				text: message,
				confirmText: 'Да',
				confirm: () => remove(id),
				declineText: 'Нет',
			})
		);
	};

	return {
		deleteEvent,
	};
};

export default useDelete;
