import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import {
	setHasMore,
	setStatus,
	setNotifications,
	setPage,
	selectNotificationsMemo,
} from 'library/redux/notifications';
import { notificationService } from 'library/api/notificationService';
import { isEqual } from 'lodash';

import qs from 'query-string';

const useNotificationsList = () => {
	const dispatch = useAppDispatch();
	const { list, status, hasMore, page, count } = useAppSelector(selectNotificationsMemo, isEqual);

	const getNotifications = useCallback(async () => {
		if (status === 'loading' || !hasMore || !page) {
			return;
		}
		dispatch(setStatus('loading'));
		try {
			const query = qs.stringify({ page });
			const response = await notificationService.getNotificationsList(query);

			if (page === 1) {
				dispatch(setNotifications([...response.data.results]));
			} else {
				dispatch(setNotifications([...list, ...response.data.results]));
			}

			if (response.data.next) {
				dispatch(setHasMore(true));
				dispatch(setPage(page + 1));
			} else {
				dispatch(setPage(1));
				dispatch(setHasMore(false));
			}
			dispatch(setStatus('idle'));
		} catch (error) {
			console.error(error);
			dispatch(setHasMore(false));
		}
	}, [dispatch, hasMore, list, page, status]);

	useEffect(() => {
    if (list.length === count) return;
		count > 10 && dispatch(setHasMore(true));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	return { list, status, hasMore, getNotifications };
};

export default useNotificationsList;
