import { createSlice } from '@reduxjs/toolkit';
import { SchedulesState } from 'library/types/schedules';

import * as reducers from './reducers';
import * as thunks from './thunks';
import * as extraReducers from './extraReducers';

const initialState: SchedulesState = {
	tab: 'week',
	consultations: {
		date: new Date(),
		status: 'idle',
		consultations: [],
		busy: [],
		timezone: 'Europe/Moscow',
	},
	editor: {
		date: new Date(),
		status: 'idle',
		mode: 'ON',
		consultations: [],
		busy: [],
		mock: null,
		timezone: 'Europe/Moscow',
	},
	address: {
		selected: null,
		status: 'idle',
		list: [],
	},
	activeConsultation: null,
	clientConsultations: {
		status: 'idle',
		hasNext: true,
		page: 1,
		list: [],
	},
};

export const schedules = createSlice({
	name: 'schedules',
	initialState,
	reducers: {
		changeDate: reducers.changeDate,
		changeMode: reducers.changeMode,
		changeTab: reducers.changeTab,
		addMockSession: reducers.addMockSession,
		changeAddress: reducers.changeAddress,
		changeActiveConsultation: reducers.changeActiveConsultation,
		setClientConsultations: reducers.setClientConsultations,
		changeTimezone: reducers.changeTimezone,
	},
	extraReducers: (builder) => {
		builder.addCase(thunks.getConsultations.pending, extraReducers.getConsultationsPending);
		builder.addCase(thunks.getConsultations.fulfilled, extraReducers.getConsultationsFulfilled);

		builder.addCase(thunks.createConsultation.pending, extraReducers.createConsultationPending);
		builder.addCase(thunks.createConsultation.fulfilled, extraReducers.createConsultationFulfilled);

		builder.addCase(thunks.updateConsultation.pending, extraReducers.updateConsultationPending);
		builder.addCase(thunks.updateConsultation.fulfilled, extraReducers.updateConsultationFulfilled);

		builder.addCase(thunks.removeConsultation.pending, extraReducers.removeConsultationPending);
		builder.addCase(thunks.removeConsultation.fulfilled, extraReducers.removeConsultationFulFilled);

		builder.addCase(thunks.setAddressList.fulfilled, extraReducers.setAddressListFulfilled);

		builder.addCase(thunks.getAddressList.pending, extraReducers.getAddressListPending);
		builder.addCase(thunks.getAddressList.fulfilled, extraReducers.getAddressListFulfilled);
		builder.addCase(thunks.getAddressList.rejected, extraReducers.getAddressListRejected);

		builder.addCase(thunks.addAddress.pending, extraReducers.addAddressPending);
		builder.addCase(thunks.addAddress.fulfilled, extraReducers.addAddressFulFilled);
		builder.addCase(thunks.addAddress.rejected, extraReducers.addAddressRejected);

		builder.addCase(thunks.removeAddress.pending, extraReducers.removeAddressPending);
		builder.addCase(thunks.removeAddress.fulfilled, extraReducers.removeAddressFulFilled);
		builder.addCase(thunks.removeAddress.rejected, extraReducers.removeAddressRejected);
	},
});

export * from './thunks';
export * from './selectors';

export const {
	changeDate,
	changeMode,
	changeTab,
	addMockSession,
	changeAddress,
	changeActiveConsultation,
	setClientConsultations,
	changeTimezone,
} = schedules.actions;

export default schedules.reducer;
