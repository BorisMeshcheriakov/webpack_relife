import { PayloadAction } from '@reduxjs/toolkit';
import { GetNotificationsResponse, NotificationsState } from 'library/types/notifications';

export const getNotificationsPending = (state: NotificationsState) => {
	state.notificationsList.status = 'loading';
};

export const getNotificationsFullfilled = (
	state: NotificationsState,
	action: PayloadAction<GetNotificationsResponse>
) => {
	if (action.payload.previous) {
		state.notificationsList.list = [...state.notificationsList.list, ...action.payload.results];
	} else {
		state.notificationsList.list = action.payload.results;
	}
	state.notificationsList.count = action.payload.count;
	state.notificationsList.status = 'idle';
};

export const getNotificationsRejected = (state: NotificationsState) => {
	state.notificationsList.list = [];
	state.notificationsList.status = 'idle';
	state.notificationsList.page = 1;
};
