import { notificationService } from 'library/api/notificationService';
import { changeNotification } from 'library/redux/notifications';
import { useCallback } from 'react';
import { useAppDispatch } from '../common';

export const useChangeNotification = () => {
	const dispatch = useAppDispatch();
	const pathcNotification = useCallback(
		async (id) => {
			try {
				const response = await notificationService.changeNotificationsStatus(id, {
					is_readed: true,
				});
				if (response.data) {
					dispatch(changeNotification(response.data));
				}
			} catch (error) {
				console.error(error);
			}
		},
		[dispatch]
	);

	return { pathcNotification };
};

export default useChangeNotification;
