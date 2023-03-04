import { useEffect } from 'react';
import { getCookie } from '../../../setupCookie';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { getNotificationsList } from 'library/redux/notifications';

export const useLoadNotifications = () => {
	const dispatch = useAppDispatch();
	const token = getCookie('token');

	useEffect(() => {
		token && dispatch(getNotificationsList());
	}, [dispatch, token]);

	useEffect(() => {
		const idInterval = setInterval(() => {
			token && dispatch(getNotificationsList());
		}, 60000);
		return () => {
			clearInterval(idInterval);
		};
	}, [dispatch, token]);
};

export default useLoadNotifications;
