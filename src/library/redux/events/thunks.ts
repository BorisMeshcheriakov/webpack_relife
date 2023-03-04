import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from 'library/models/programs';

import { programsService } from 'library/api/programsService';
import { eventService } from 'library/api/eventService';
import { AxiosError } from 'axios';
import { openNotifyModal } from 'library/redux/modal';
import { GetEventResponse } from 'library/types/events';

export const getTags = createAsyncThunk<Tag[], void, {}>(
	'events/tags',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await programsService.getTags();
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (error) {
			const err = error as AxiosError;
			dispatch(
				openNotifyModal({
					title: 'Ошибка',
					text: err.response?.status === 400 ? 'Не удалось загрузить теги' : 'Неизвестная ошибка',
					confirmText: 'Ок',
				})
			);
			return rejectWithValue('Не удалось загрузить корзину');
		}
	}
);

export const getEvents = createAsyncThunk<GetEventResponse, string>(
	'events/list',
	async (data, { rejectWithValue }) => {
		try {
			const response = await eventService.getEvents(data);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (error) {
			// const err = error as AxiosError;
			return rejectWithValue('Не удалось загрузить мероприятия');
		}
	}
);
