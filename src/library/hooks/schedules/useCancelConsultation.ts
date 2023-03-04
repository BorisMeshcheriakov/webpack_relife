import { schedulesService } from 'library/api/schedulesService';
import { openDialogModal, openNotifyModal } from 'library/redux/modal';
import { changeActiveConsultation, selectActiveConsultation } from 'library/redux/schedules';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';

const useCancelConsultation = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const { user } = useUser();
	const activeConsultation = useAppSelector(selectActiveConsultation);

	const cancel = async (id: any) => {
		try {
			const response = await schedulesService.cancelConsultation(id);

			if (!response.data) throw response;

			if (activeConsultation)
				dispatch(changeActiveConsultation({ ...activeConsultation, cancelled: true }));

			dispatch(
				openNotifyModal({
					title: 'Отмена консультации',
					text: `Консультация отменена. Деньги вернутся на счет ${
						user?.is_coach ? 'клиента' : ''
					} в течение 7 дней`,
					confirmText: 'Ок',
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	const suggest = () => push(`${url}/suggest-change`);

	const cancelConsultation = (id: any) => {
		if (user?.is_coach) {
			dispatch(
				openDialogModal({
					title: 'Отмена консультации',
					text: 'Вы собираетесь отменить консультацию. Хотите предложить Вашему клиенту выбрать другое время?',
					confirmText: 'Да, предложить',
					declineText: 'Нет, отменить',
					decline: () => cancel(id),
					confirm: () => suggest(),
				})
			);
		}

		if (user?.is_client) {
			dispatch(
				openDialogModal({
					title: 'Отмена консультации',
					text: 'Вы действительно хотите отменить консультацию?',
					confirmText: 'Да',
					declineText: 'Нет',
					confirm: () => cancel(id),
				})
			);
		}
	};

	return {
		cancelConsultation,
	};
};

export default useCancelConsultation;
