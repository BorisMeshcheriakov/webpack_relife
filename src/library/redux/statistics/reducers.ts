import { PayloadAction } from '@reduxjs/toolkit';
import { addMonths, addYears, parseISO } from 'date-fns';
import { Tab, StatisticsState, Status } from 'library/types/statistics';
import { getCurrentMonthDate, getCurrentYearDate } from 'library/helpers/statistics/statisticsDate';
import { Statistics } from 'library/models/statistics';

/// общие редюсеры (работа и на главной и в модальном окне)

// Вся суть общих редюсеров сводится к привязке первоначальных данных модально окна (tab, date, graphicsType)
// к главной странице статисткикe

// очистка данных при выходе пользователя из аккаунта
export const clearStatistics = (state: StatisticsState) => {
	state.tab = { code: 'year', title: 'Год' };
	state.date = getCurrentYearDate();
	state.graphicsType = 'graphic';
	state.statisticsLists = {
		programs: { status: 'idle', title: 'programs', list: [] },
		events: { status: 'idle', title: 'events', list: [] },
		tickets: { status: 'idle', title: 'tickets', list: [] },
		orders: { status: 'idle', title: 'orders', list: [] },
		consultations: { status: 'idle', title: 'consultations', list: [] },
	};
	state.statistics = {
		tab: { code: 'year', title: 'Год' },
		date: getCurrentYearDate(),
		graphicsType: 'graphic',
		list: { status: 'idle', title: null, list: [] },
	};
};

// переключение табов
export const setStatisticsTabs = (
	state: StatisticsState,
	action: PayloadAction<{ tab: Tab; isModal?: boolean }>
) => {
	if (!action.payload.isModal) {
		// дата и таб модального окна привязывается к дате главной страницы
		state.tab = { code: action.payload.tab.code, title: action.payload.tab.title };
		state.statistics.tab = { code: action.payload.tab.code, title: action.payload.tab.title };
		if (action.payload.tab.code === 'year') {
			state.date = getCurrentYearDate();
			state.statistics.date = getCurrentYearDate();
		} else {
			state.date = getCurrentMonthDate();
			state.statistics.date = getCurrentMonthDate();
		}
	} else {
		//  дата и таб в модальном окне изменяются независимо от главной страницы
		state.statistics.tab = { code: action.payload.tab.code, title: action.payload.tab.title };
		action.payload.tab.code === 'year'
			? (state.statistics.date = getCurrentYearDate())
			: (state.statistics.date = getCurrentMonthDate());
	}
};

// изменение даты
export const changeStatisticsDate = (
	state: StatisticsState,
	action: PayloadAction<{ type: 'add' | 'rem'; isModal?: boolean }>
) => {
	if (!action.payload.isModal) {
		if (state.tab.code === 'year') {
			if (action.payload.type === 'add') {
				state.date = getCurrentYearDate(addYears(parseISO(state.date), 1));
				state.statistics.date = getCurrentYearDate(addYears(parseISO(state.statistics.date), 1));
			} else {
				state.date = getCurrentYearDate(addYears(parseISO(state.date), -1));
				state.statistics.date = getCurrentYearDate(addYears(parseISO(state.statistics.date), -1));
			}
		} else {
			if (action.payload.type === 'add') {
				state.date = getCurrentMonthDate(addMonths(parseISO(state.date), 1));
				state.statistics.date = getCurrentMonthDate(addMonths(parseISO(state.statistics.date), 1));
			} else {
				state.date = getCurrentMonthDate(addMonths(parseISO(state.date), -1));
				state.statistics.date = getCurrentMonthDate(addMonths(parseISO(state.statistics.date), -1));
			}
		}
	} else {
		state.statistics.tab.code === 'year'
			? action.payload.type === 'add'
				? (state.statistics.date = getCurrentYearDate(addYears(parseISO(state.statistics.date), 1)))
				: (state.statistics.date = getCurrentYearDate(
						addYears(parseISO(state.statistics.date), -1)
				  ))
			: action.payload.type === 'add'
			? (state.statistics.date = getCurrentMonthDate(addMonths(parseISO(state.statistics.date), 1)))
			: (state.statistics.date = getCurrentMonthDate(
					addMonths(parseISO(state.statistics.date), -1)
			  ));
	}
};

export const changeStatisticsGraphics = (
	state: StatisticsState,
	action: PayloadAction<{ isModal?: boolean }>
) => {
	if (!action.payload.isModal) {
		if (state.graphicsType === 'graphic') {
			state.graphicsType = 'histogram';
			state.statistics.graphicsType = 'histogram';
		} else {
			state.graphicsType = 'graphic';
			state.statistics.graphicsType = 'graphic';
		}
	} else {
		state.statistics.graphicsType === 'graphic'
			? (state.statistics.graphicsType = 'histogram')
			: (state.statistics.graphicsType = 'graphic');
	}
};

/// редюсеры модального окна

export const setStatusStatisticsModal = (state: StatisticsState, action: PayloadAction<Status>) => {
	state.statistics.list.status = action.payload;
};

export const resetStatisticsListModal = (state: StatisticsState) => {
	state.statistics.list = { status: 'idle', list: [], title: null };
};

export const resetStatisticsModal = (state: StatisticsState) => {
	state.statistics.list = { status: 'idle', list: [], title: null };
	state.statistics.date = state.date;
	state.statistics.tab = state.tab;
	state.statistics.graphicsType = state.graphicsType;
};

export const setStatisticsListModal = (
	state: StatisticsState,
	action: PayloadAction<Statistics[]>
) => {
	state.statistics.list.list = action.payload;
};

/// редюсеры главной страницы

export const resetStatisticsLists = (state: StatisticsState) => {
	state.statisticsLists.programs = { status: 'idle', list: [], title: 'programs' };
	state.statisticsLists.events = { status: 'idle', title: 'events', list: [] };
	state.statisticsLists.tickets = { status: 'idle', title: 'tickets', list: [] };
	state.statisticsLists.orders = { status: 'idle', title: 'orders', list: [] };
	state.statisticsLists.consultations = { status: 'idle', title: 'consultations', list: [] };
};
