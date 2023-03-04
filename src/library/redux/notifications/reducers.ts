import { PayloadAction } from '@reduxjs/toolkit';
import { Notification } from 'library/models/notifications';
import { NotificationsState } from 'library/types/notifications';

export const reset = (state: NotificationsState) => {
	state.notificationsList.list = [];
	state.notificationsList.page = 1;
	state.notificationsList.hasMore = true;
	state.notificationsList.status = 'idle';
};

export const clearNotifications = (state: NotificationsState) => {
	state.notificationsList = {
		list: [],
		page: 1,
		status: 'idle',
		hasMore: true,
		count: 0,
	};
};

export const setNotifications = (
	state: NotificationsState,
	action: PayloadAction<Notification[]>
) => {
	state.notificationsList.list = action.payload;
};

export const setStatus = (state: NotificationsState, action: PayloadAction<'idle' | 'loading'>) => {
	state.notificationsList.status = action.payload;
};

export const setPage = (state: NotificationsState, action: PayloadAction<number>) => {
	state.notificationsList.page = action.payload;
};

export const setHasMore = (state: NotificationsState, action: PayloadAction<boolean>) => {
	state.notificationsList.hasMore = action.payload;
};

export const changeNotification = (
	state: NotificationsState,
	action: PayloadAction<Notification>
) => {
	const idx = state.notificationsList.list.findIndex(
		(notification) => notification.id === action.payload.id
	);
	state.notificationsList.list[idx] = { ...state.notificationsList.list[idx], ...action.payload };
};
