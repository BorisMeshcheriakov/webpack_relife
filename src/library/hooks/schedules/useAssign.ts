import { format, parseISO } from 'date-fns';
import { schedulesService } from 'library/api/schedulesService';
import { ClientList } from 'library/models/clients';
import { CoachAvailablePeriods } from 'library/models/schedules';
import { openDialogModal, showPopup } from 'library/redux/modal';
import { ModeCode } from 'library/types/schedules';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from '../common';
import ru from 'date-fns/locale/ru';
import { getInitial } from 'library/helpers/user';
import { setClientConsultations } from 'library/redux/schedules';

const useAssign = () => {
	const dispatch = useAppDispatch();
	const { url } = useRouteMatch();
	const { push } = useHistory();

	const notifyUser = (consultationId: number) => {
		push(`${url}/notify/${consultationId}`);
	};

	const onAssign = async (
		data: any,
		client: ClientList,
		schedule: CoachAvailablePeriods,
		mode: ModeCode,
		onSuccess?: () => void
	) => {
		let id = 0;
		try {
			const response = await schedulesService.assignSchedule(data);
			id = response.data.consultation_id;
			dispatch(setClientConsultations({ status: 'idle', hasNext: true, page: 1, list: [] }));
		} catch (error) {
			console.error(error);
			dispatch(showPopup({ type: 'error', text: 'Не удалось записать клиента' }));
			return;
		}

		const { last_name, first_name, middle_name } = client;
		const modeTitle = {
			ON: 'онлайн консультацию',
			OF: 'личный прием',
		};

		dispatch(
			openDialogModal({
				title: 'Запись на консультацию',
				text: `Вы успешно записали пользователя ${getInitial(
					first_name,
					middle_name,
					last_name
				)} на ${modeTitle[mode]} ${format(parseISO(schedule.start_time), 'dd MMMM yyyy', {
					locale: ru,
				})} в ${format(parseISO(schedule.start_time), 'HH:mm', {
					locale: ru,
				})} \n Вы хотите оповестить клиента о созданном событии?`,
				confirmText: 'Да',
				declineText: 'Нет',
				confirm: () => notifyUser(id),
				decline: onSuccess ? () => onSuccess() : undefined,
			})
		);
	};
	return {
		onAssign,
	};
};

export default useAssign;
