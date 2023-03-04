import { RootState } from 'core/redux/store';
import { parseISO } from 'date-fns';
import { createSelector } from 'reselect';

export const selectNotifications = (state: RootState) => state.notifications.notificationsList;

export const selectSortNotifications = createSelector(
	[selectNotifications],
	(notificationsList) => {
		return {
			read: [...notificationsList.list].filter((el) => el.is_readed),
			unread: [...notificationsList.list].filter((el) => !el.is_readed),
		};
	}
);

export const selectNotificationsMemo = createSelector(
	[selectNotifications, selectSortNotifications],
	(notificationsList, selectSortNotifications) => {
		return {
			// сортировка списка уведомлений [ сначала непрочитанные уведомления, потом идут прочитанные, отсортированные по дате]
			list: [
				...selectSortNotifications.unread,
				...selectSortNotifications.read.sort((a, b) => +parseISO(b.created) - +parseISO(a.created)),
			],
			status: notificationsList.status,
			page: notificationsList.page,
			hasMore: notificationsList.hasMore,
      count: notificationsList.count,
		};
	}
);
