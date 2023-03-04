import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from 'library/types/notifications';

import * as reducers from './reducers';
import * as thunks from './thunks';
import * as extraReducers from './extraReducers';

const initialState: NotificationsState = {
	notificationsList: {
		list: [],
		page: 1,
		status: 'idle',
		hasMore: true,
		count: 0,
	},
};

const notifications = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		clearNotifications: reducers.clearNotifications,
		setStatus: reducers.setStatus,
		resetNotifications: reducers.reset,
		setNotifications: reducers.setNotifications,
		setPage: reducers.setPage,
		setHasMore: reducers.setHasMore,
		changeNotification: reducers.changeNotification,
	},
	extraReducers: (builder) => {
		builder.addCase(thunks.getNotificationsList.pending, extraReducers.getNotificationsPending);
		builder.addCase(
			thunks.getNotificationsList.fulfilled,
			extraReducers.getNotificationsFullfilled
		);
		builder.addCase(thunks.getNotificationsList.rejected, extraReducers.getNotificationsRejected);
	},
});

export * from './thunks';
export * from './selectors';

export const {
	resetNotifications,
	setNotifications,
	setPage,
	setHasMore,
	setStatus,
	changeNotification,
	clearNotifications,
} = notifications.actions;

export default notifications.reducer;
