import { Calendar, SchedulesState } from 'library/types/schedules';
import { PayloadAction } from '@reduxjs/toolkit';
import { CoachAvailablePeriods, OriginSchedule, ScheduleAddress } from 'library/models/schedules';
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { timeFormat } from 'library/helpers/schedules';

export const getConsultationsPending = (state: SchedulesState, action: PayloadAction) => {
	state.consultations.status = 'loading';
	state.editor.status = 'loading';
};

export const getConsultationsFulfilled = (
	state: SchedulesState,
	action: PayloadAction<{
		calendar: Calendar;
		open: CoachAvailablePeriods[];
		busy: OriginSchedule[];
	}>
) => {
	const { calendar, open, busy } = action.payload;
	switch (calendar) {
		case 'consultations':
			state.consultations.consultations = open;
			state.consultations.busy = busy;
			state.consultations.status = 'idle';
			break;
		case 'editor':
			state.editor.consultations = open;
			state.editor.busy = busy;
			state.editor.status = 'idle';
			break;
		default:
			break;
	}
};

export const createConsultationPending = (state: SchedulesState) => {
	let openEditor = state.editor.consultations;

	// Вставляем заглушку, пока не отработал запрос на создание сессии
	if (state.editor.mock) {
		const { start_time, end_time } = state.editor.mock;
		const start = format(zonedTimeToUtc(parseISO(start_time), state.editor.timezone), timeFormat);
		const end = format(zonedTimeToUtc(parseISO(end_time), state.editor.timezone), timeFormat);
		openEditor.push({ ...state.editor.mock, start_time: start, end_time: end });
		state.editor.mock = null;
		state.editor.consultations = openEditor;
	}
};

export const createConsultationFulfilled = (
	state: SchedulesState,
	action: PayloadAction<CoachAvailablePeriods>
) => {
	let editorConsultations = state.editor.consultations;
	let calendarConsultations = state.consultations.consultations;

	// Вставляем вместо заглушки созданную сессию
	if (action.payload) {
		let mockIdx = editorConsultations.findIndex(
			(session) =>
				parseISO(session.start_time).valueOf() === parseISO(action.payload.start_time).valueOf() &&
				!session.id
		);
		if (mockIdx !== -1) {
			editorConsultations.splice(mockIdx, 1, action.payload);
		} else {
			editorConsultations.push(action.payload);
		}
		calendarConsultations.push(action.payload);

		state.editor.consultations = editorConsultations;
		state.consultations.consultations = calendarConsultations;
	}
};

export const updateConsultationPending = (state: SchedulesState) => {
	state.editor.mock = null;
};

export const updateConsultationFulfilled = (
	state: SchedulesState,
	action: PayloadAction<CoachAvailablePeriods>
) => {
	let open = [...state.consultations.consultations];
	let openEditor = [...state.editor.consultations];
	if (action.payload) {
		let editorIdx = openEditor.findIndex((open) => open.id === action.payload.id);
		let openIdx = open.findIndex((open) => open.id === action.payload.id);
		if (editorIdx !== -1) {
			openEditor[editorIdx] = action.payload;
			state.editor.consultations = openEditor;
		}
		if (openIdx !== -1) {
			open[openIdx] = action.payload;
			state.consultations.consultations = open;
		}
	}
};

export const removeConsultationPending = (state: SchedulesState) => {
	state.editor.mock = null;
};

export const removeConsultationFulFilled = (
	state: SchedulesState,
	action: PayloadAction<CoachAvailablePeriods>
) => {
	let openEditor = [...state.editor.consultations].filter(
		(session) => session.id !== action.payload.id
	);
	state.editor.consultations = openEditor;
	state.editor.mock = null;
};

//*
export const setAddressListFulfilled = (
	state: SchedulesState,
	action: PayloadAction<ScheduleAddress[]>
) => {
	state.address.list = action.payload;
};

//////////////////////////////

export const getAddressListPending = (state: SchedulesState) => {
	state.address.status = 'loading';
};

export const getAddressListFulfilled = (
	state: SchedulesState,
	action: PayloadAction<ScheduleAddress[]>
) => {
	state.address.list = action.payload;

	if (action.payload.length > 0) {
		state.address.selected = action.payload[0];
	}
	state.address.status = 'idle';
};

export const getAddressListRejected = (state: SchedulesState) => {
	state.address.status = 'idle';
};

export const removeAddressPending = (state: SchedulesState) => {
	state.address.status = 'loading';
};

export const removeAddressFulFilled = (state: SchedulesState, action: PayloadAction<number>) => {
	const updateList = [...state.address.list].filter((item) => item.id !== action.payload);
	state.address.list = updateList;
	state.address.status = 'idle';
};

export const removeAddressRejected = (state: SchedulesState) => {
	state.address.status = 'idle';
};

export const addAddressPending = (state: SchedulesState) => {
	state.address.status = 'loading';
};

export const addAddressFulFilled = (
	state: SchedulesState,
	action: PayloadAction<ScheduleAddress>
) => {
	state.address.list = [...state.address.list, action.payload];
	state.address.status = 'idle';
};

export const addAddressRejected = (state: SchedulesState) => {
	state.address.status = 'idle';
};
