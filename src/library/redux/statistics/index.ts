import { createSlice } from '@reduxjs/toolkit';
import { StatisticsState } from 'library/types/statistics';
import { getCurrentYearDate } from 'library/helpers/statistics/statisticsDate';

import * as reducers from './reducers';
import * as thunks from './thunks';
import * as extraReducers from './extraReducers';

const initialState: StatisticsState = {
	tab: { code: 'year', title: 'Год' },
	date: getCurrentYearDate(),
	graphicsType: 'graphic',
	statisticsLists: {
		programs: { status: 'idle', title: 'programs', list: [] },
		events: { status: 'idle', title: 'events', list: [] },
		tickets: { status: 'idle', title: 'tickets', list: [] },
		orders: { status: 'idle', title: 'orders', list: [] },
		consultations: { status: 'idle', title: 'consultations', list: [] },
	},
	statistics: {
		tab: { code: 'year', title: 'Год' },
		date: getCurrentYearDate(),
		graphicsType: 'graphic',
		list: { status: 'idle', title: null, list: [] },
	},
};

const statistics = createSlice({
	name: 'statistics',
	initialState,
	reducers: {
		clearStatistics: reducers.clearStatistics,
		setStatisticsTabs: reducers.setStatisticsTabs,
		resetStatisticsLists: reducers.resetStatisticsLists,
		changeStatisticsDate: reducers.changeStatisticsDate,
		changeStatisticsGraphics: reducers.changeStatisticsGraphics,
		resetStatisticsListModal: reducers.resetStatisticsListModal,
		resetStatisticsModal: reducers.resetStatisticsModal,
		setStatisticsListModal: reducers.setStatisticsListModal,
		setStatusStatisticsModal: reducers.setStatusStatisticsModal,
	},
	extraReducers: (builder) => {
		// программы
		builder.addCase(
			thunks.getProgramsStatistics.pending,
			extraReducers.getProgramsStatisticsPending
		);
		builder.addCase(
			thunks.getProgramsStatistics.fulfilled,
			extraReducers.getProgramsStatisticsFullfilled
		);
		builder.addCase(
			thunks.getProgramsStatistics.rejected,
			extraReducers.getProgramsStatisticsRejected
		);

		// мероприятия

		builder.addCase(thunks.getEventsStatistics.pending, extraReducers.getEventsStatisticsPending);
		builder.addCase(
			thunks.getEventsStatistics.fulfilled,
			extraReducers.getEventsStatisticsFullfilled
		);
		builder.addCase(thunks.getEventsStatistics.rejected, extraReducers.getEventsStatisticsRejected);

		// консультации

		builder.addCase(
			thunks.getConsultationsStatistics.pending,
			extraReducers.getConsultationsStatisticsPending
		);
		builder.addCase(
			thunks.getConsultationsStatistics.fulfilled,
			extraReducers.getConsultationsStatisticsFullfilled
		);
		builder.addCase(
			thunks.getConsultationsStatistics.rejected,
			extraReducers.getConsultationsStatisticsRejected
		);

		// заказы с использованием промокода
		builder.addCase(thunks.getOrdersStatistics.pending, extraReducers.getOrdersStatisticsPending);

		builder.addCase(
			thunks.getOrdersStatistics.fulfilled,
			extraReducers.getOrdersStatisticsFullfilled
		);
		builder.addCase(thunks.getOrdersStatistics.rejected, extraReducers.getOrdersStatisticsRejected);
	},
});

export const {
	clearStatistics,
	setStatisticsTabs,
	resetStatisticsLists,
	changeStatisticsDate,
	changeStatisticsGraphics,
	resetStatisticsListModal,
	resetStatisticsModal,
	setStatisticsListModal,
	setStatusStatisticsModal,
} = statistics.actions;

export * from './selectors';
export * from './thunks';

export default statistics.reducer;
