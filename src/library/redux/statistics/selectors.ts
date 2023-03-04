import { RootState } from 'core/redux/store';
import { Statistics } from 'library/models/statistics';
import { createSelector } from 'reselect';

export const selectStatistics = (state: RootState) => state.statistics;

export const selectStatisticsModal = (state: RootState) => state.statistics.statistics;

export const selectStatisticsInfoMemo = createSelector(
	[selectStatisticsModal],
	(selectStatisticsModal) => {
		return {
			count: selectStatisticsModal.list.list.reduce((a: number, b: Statistics) => a + b.count, 0),
			amount: selectStatisticsModal.list.list.reduce(
				(a: number, b: Statistics) => (b.amount ? a + b.amount : 0),
				0
			),
		};
	}
);

export const selectStatisticsMemo = createSelector([selectStatistics], (selectStatistics) => {
	return {
		statistics: selectStatistics.statistics,
		lists: selectStatistics.statisticsLists,
		tab: selectStatistics.tab,
		date: selectStatistics.date,
		graph: selectStatistics.graphicsType,
	};
});

export const selectStatisticsListMemo = createSelector([selectStatistics], (selectStatistics) => {
	return {
		programs: selectStatistics.statisticsLists.programs,
		events: selectStatistics.statisticsLists.events,
		orders: selectStatistics.statisticsLists.orders,
		consultations: selectStatistics.statisticsLists.consultations,
	};
});
