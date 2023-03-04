import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'core/redux/store';
import {
	addDays,
	endOfDay,
	endOfMonth,
	endOfWeek,
	format,
	startOfDay,
	startOfMonth,
	startOfWeek,
	subDays,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { schedulesService } from 'library/api/schedulesService';
import { CoachAvailablePeriods, ScheduleAddress } from 'library/models/schedules';
import { Calendar, SessionUpdate, TabCode } from 'library/types/schedules';
import qs from 'query-string';
import { showPopup } from '../modal';

const getMethod = (tab: TabCode, type: 'start' | 'end') => {
	let method;

	switch (tab) {
		case 'day':
			method = type === 'start' ? startOfDay : endOfDay;
			break;
		case 'week':
			method = type === 'start' ? startOfWeek : endOfWeek;
			break;
		case 'month':
			method = type === 'start' ? startOfMonth : endOfMonth;
			break;
	}

	return method;
};

export const getConsultations = createAsyncThunk(
	'schedules/getConsultations',
	async (data: { date: Date; tab: TabCode; id: number; calendar: Calendar; tz: string }) => {
		/**
		 * Получаем свободные и занятые консультации за выбранный период
		 * Для корректного отображения консультаций во вкладках "день" и "месяц"
		 * необходимо расширить период запроса на 1 день в начале и 1 день в конце
		 */

		const { date, tab, id, calendar, tz } = data;

		const start = format(
			subDays(
				zonedTimeToUtc(
					getMethod(tab, 'start')(date, tab === 'week' ? { weekStartsOn: 1 } : undefined),
					tz
				),
				tab === 'month' ? 0 : 1
			),
			"yyyy-MM-dd'T'HH:mm"
		);
		const end = format(
			addDays(
				zonedTimeToUtc(
					getMethod(tab, 'end')(date, tab === 'week' ? { weekStartsOn: 1 } : undefined),
					tz
				),
				tab === 'month' ? 0 : 1
			),
			"yyyy-MM-dd'T'HH:mm"
		);

		let query = qs.stringify({
			start_time: start,
			end_time: end,
			id: id,
		});

		const response = await Promise.all([
			schedulesService.getOpenSchedules(query),
			schedulesService.getBusySchedules(query),
		]);

		// console.log(response.data);
		return { calendar: calendar, open: response[0].data, busy: response[1].data };
	}
);

export const createConsultation = createAsyncThunk(
	'schedules/createConsultation',
	async (data: any, { rejectWithValue, dispatch }) => {
		try {
			const response = await schedulesService.createConsultation(data);

			if (!response.data) throw response;

			dispatch(showPopup({ type: 'success', text: 'График создан' }));
			return response.data;
		} catch (error) {
			dispatch(showPopup({ type: 'error', text: 'Не удалось создать график' }));
			return rejectWithValue(error);
		}
	}
);

export const updateConsultation = createAsyncThunk(
	'schedules/updateConsultation',
	async (data: SessionUpdate, { rejectWithValue, dispatch }) => {
		try {
			const response = await schedulesService.updateConsultation(data);

			if (!response.data) throw response;

			dispatch(showPopup({ type: 'success', text: 'График обновлен' }));
			return response.data;
		} catch (error) {
			dispatch(showPopup({ type: 'error', text: 'Не удалось обновить график' }));
			return rejectWithValue(error);
		}
	}
);

export const removeConsultation = createAsyncThunk(
	'schedules/removeConsultation',
	async (data: CoachAvailablePeriods, { rejectWithValue, dispatch }) => {
		try {
			const response = await schedulesService.removeConsultation(data.id!);

			if (response.status !== 204) throw response;

			dispatch(showPopup({ type: 'success', text: 'График удален' }));
			return data;
		} catch (error) {
			dispatch(showPopup({ type: 'error', text: 'Не удалось удалить график' }));
			return rejectWithValue(error);
		}
	}
);

// *
export const setAddressList = createAsyncThunk(
	'schedules/setAddressList',
	async (addressList: ScheduleAddress[], { getState }) => {
		const state = getState() as RootState;
		const addresses = [...state.schedules.address.list];
		const response = await Promise.all([
			...addresses.map((addr) => schedulesService.deleteAddress(addr.id)),
			...addressList.map((addr: any, index: number) =>
				schedulesService.createAddress({ ...addr, visible: true, order: index })
			),
		]);
		return response.filter((res) => res.data).map((res) => res.data);
	}
);

////////////////////////////////////////

export const getAddressList = createAsyncThunk(
	'schedules/getAddressList',
	async (_, { rejectWithValue }) => {
		try {
			const response = await schedulesService.getAddressList();
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const addAddress = createAsyncThunk(
	'schedules/addAddress',
	async (address: any, { rejectWithValue }) => {
		try {
			const response = await schedulesService.createAddress(address);
			if (!response.data) {
				throw response;
			}
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const removeAddress = createAsyncThunk(
	'schedules/removeAddress',
	async (id: number, { rejectWithValue }) => {
		try {
			await schedulesService.deleteAddress(id);
			return id;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
