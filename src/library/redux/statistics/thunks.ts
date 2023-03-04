import { createAsyncThunk } from '@reduxjs/toolkit';
import { statisticsService } from 'library/api/statisticsService';
import { Statistics } from 'library/models/statistics';
import { reqStatistics } from 'library/types/statistics';

export const getProgramsStatistics = createAsyncThunk<Statistics[] | any, reqStatistics, {}>(
	'statistics/programs',
	async ({ mode, date }, { rejectWithValue }) => {
		try {
			const response =
				mode === 'year'
					? await statisticsService.getProgramsYearStatistics(date)
					: await statisticsService.getProgramsMounthStatistics(date);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (e) {
			rejectWithValue('Не удалось загрузить статистику видеопрограмм.');
		}
	}
);

export const getEventsStatistics = createAsyncThunk<Statistics[] | any, reqStatistics, {}>(
	'statistics/events',
	async ({ mode, date }, { rejectWithValue }) => {
		try {
			const response =
				mode === 'year'
					? await statisticsService.getEventsYearStatistics(date)
					: await statisticsService.getEventsMounthStatistics(date);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (e) {
			rejectWithValue('Не удалось загрузить статистику мероприятий.');
		}
	}
);

export const getConsultationsStatistics = createAsyncThunk<Statistics[] | any, reqStatistics, {}>(
	'statistics/consultations',
	async ({ mode, date }, { rejectWithValue }) => {
		try {
			const response =
				mode === 'year'
					? await statisticsService.getConsultationsYearStatistics(date)
					: await statisticsService.getConsultationsMounthStatistics(date);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (e) {
			rejectWithValue('Не удалось загрузить статистику консультаций.');
		}
	}
);

export const getOrdersStatistics = createAsyncThunk<Statistics[] | any, reqStatistics, {}>(
	'statistics/orders',
	async ({ mode, date }, { rejectWithValue }) => {
		try {
			const response =
				mode === 'year'
					? await statisticsService.getStoreYearStatistics(date)
					: await statisticsService.getStoreMounthStatistics(date);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (e) {
			rejectWithValue('Не удалось загрузить статистику билетов с использованием промокода.');
		}
	}
);
