import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationService } from 'library/api/notificationService';
import { GetNotificationsResponse } from 'library/types/notifications';

export const getNotificationsList = createAsyncThunk<GetNotificationsResponse | any, string | void>(
	'notification/list',
	async (_, { rejectWithValue }) => {
		try {
			// первичная подгрузка всех уведомлений
			const response = await notificationService.getNotificationsList();
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
