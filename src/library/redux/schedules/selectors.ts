import type { RootState } from 'core/redux/store';
import { parseISO } from 'date-fns';
import { Calendar } from 'library/types/schedules';
import { createSelector } from 'reselect';

export const selectDate = (state: RootState, calendar: Calendar) => state.schedules[calendar].date;

export const selectTab = (state: RootState) => state.schedules.tab;

export const selectOpen = (state: RootState, calendar: Calendar) =>
	state.schedules[calendar].consultations;

export const selectBusy = (state: RootState, calendar: Calendar) => state.schedules[calendar].busy;

export const selectMock = (state: RootState) => {
	return state.schedules.editor.mock;
};

export const selectMockByDate = (state: RootState, start: Date, end: Date) => {
	if (
		state.schedules.editor.mock &&
		parseISO(state.schedules.editor.mock?.start_time) <= start &&
		parseISO(state.schedules.editor.mock?.end_time) >= end
	) {
		return state.schedules.editor.mock;
	}
};

export const selectConsultationByDate = (
	state: RootState,
	start: Date,
	end: Date,
	calendar: Calendar
) => {
	return state.schedules[calendar].consultations.find((consultation) => {
		return parseISO(consultation.start_time) <= start && parseISO(consultation.end_time) >= end;
	});
};

export const selectBusyByDate = (state: RootState, start: Date, end: Date, calendar: Calendar) => {
	return state.schedules[calendar].busy.find((consultation) => {
		return parseISO(consultation.start_time) <= start && parseISO(consultation.end_time) >= end;
	});
};

export const selectMode = (state: RootState) => {
	return state.schedules.editor.mode;
};

export const selectAddresses = (state: RootState) => state.schedules.address.list;

export const selectAddress = (state: RootState) => state.schedules.address.selected;

export const selectStatus = (state: RootState, calendar: Calendar) =>
	state.schedules[calendar].status;

export const selectActiveConsultation = (state: RootState) => state.schedules.activeConsultation;

export const selectClientConsultations = (state: RootState) => state.schedules.clientConsultations;

export const selectTimezone = (state: RootState, calendar: Calendar) =>
	state.schedules[calendar].timezone;
export const selectAddressesStatus = (state: RootState) => state.schedules.address.status;

export const selectSortAddress = createSelector([selectAddresses], (selectAddresses) => {
	let sort = [...selectAddresses];
	return sort.sort((a, b) => Number(a.order) - Number(b.order));
});

export const selectIndexAddress = createSelector(
	[selectAddress, selectAddresses],
	(adress, list) => {
		return list.findIndex((el) => el.id === adress?.id);
	}
);
