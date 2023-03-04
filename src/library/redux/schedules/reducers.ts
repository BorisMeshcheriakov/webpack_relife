import { PayloadAction } from '@reduxjs/toolkit';

import { CoachAvailablePeriods, Consultation, ScheduleAddress } from 'library/models/schedules';
import { Calendar, ModeCode, TabCode, SchedulesState } from 'library/types/schedules';

export const changeDate = (
	state: SchedulesState,
	action: PayloadAction<{ date: Date; calendar: Calendar }>
) => {
	const { date, calendar } = action.payload;
	state[calendar].date = date;
};

export const changeMode = (state: SchedulesState, action: PayloadAction<ModeCode>) => {
	state.editor.mode = action.payload;
};

export const changeTab = (state: SchedulesState, action: PayloadAction<TabCode>) => {
	state.tab = action.payload;
};

export const addMockSession = (
	state: SchedulesState,
	action: PayloadAction<CoachAvailablePeriods | null>
) => {
	state.editor.mock = action.payload;
};

export const changeAddress = (
	state: SchedulesState,
	action: PayloadAction<ScheduleAddress | null>
) => {
	state.address.selected = action.payload;
};

export const changeActiveConsultation = (
	state: SchedulesState,
	action: PayloadAction<Consultation | null>
) => {
	state.activeConsultation = action.payload;
};

export const setClientConsultations = (
	state: SchedulesState,
	action: PayloadAction<{
		status?: 'loading' | 'idle';
		hasNext?: boolean;
		page?: number;
		list?: Consultation[];
	}>
) => {
	const { status, hasNext, page, list } = action.payload;
	if (status) state.clientConsultations.status = status;
	if (hasNext !== undefined) state.clientConsultations.hasNext = hasNext;
	if (page) state.clientConsultations.page = page;
	if (list) state.clientConsultations.list = list;
};

export const changeTimezone = (
	state: SchedulesState,
	action: PayloadAction<{ timezone: string; calendar: Calendar }>
) => {
	const { timezone, calendar } = action.payload;
	state[calendar].timezone = timezone;
};
