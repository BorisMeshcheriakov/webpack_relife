import { schedulesService } from 'library/api/schedulesService';
import { openNotifyModal } from 'library/redux/modal';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../common';

const useMoveBuyer = () => {
	const dispatch = useAppDispatch();
	const { replace } = useHistory();

	const confirmMove = async (id: number) => {
		try {
			const response = await schedulesService.acceptChange(id);

			if (!response.data) throw response;

			dispatch(
				openNotifyModal({
					title: 'Перенос консультации',
					text: 'Вы успешно подтвердили перенос консультации',
					confirmText: 'Ок',
					confirm: () => replace('/schedules'),
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		confirmMove,
	};
};

export default useMoveBuyer;
