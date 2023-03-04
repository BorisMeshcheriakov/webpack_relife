import { PayloadAction } from '@reduxjs/toolkit';
import { Statistics } from 'library/models/statistics';
import { StatisticsState } from 'library/types/statistics';

// программы

export const getProgramsStatisticsPending = (state: StatisticsState) => {
	state.statisticsLists.programs.status = 'loading';
};

export const getProgramsStatisticsFullfilled = (
	state: StatisticsState,
	action: PayloadAction<Statistics[]>
) => {
	state.statisticsLists.programs.list = action.payload;
	state.statisticsLists.programs.status = 'idle';
};

export const getProgramsStatisticsRejected = (state: StatisticsState) => {
	state.statisticsLists.programs.list = [];
	state.statisticsLists.programs.status = 'idle';
};

// мероприятия

export const getEventsStatisticsPending = (state: StatisticsState) => {
	state.statisticsLists.events.status = 'loading';
};

export const getEventsStatisticsFullfilled = (
	state: StatisticsState,
	action: PayloadAction<Statistics[]>
) => {
	state.statisticsLists.events.list = action.payload;
	state.statisticsLists.events.status = 'idle';
};

export const getEventsStatisticsRejected = (state: StatisticsState) => {
	state.statisticsLists.events.list = [];
	state.statisticsLists.events.status = 'idle';
};

// консультации

export const getConsultationsStatisticsPending = (state: StatisticsState) => {
	state.statisticsLists.consultations.status = 'loading';
};

export const getConsultationsStatisticsFullfilled = (
	state: StatisticsState,
	action: PayloadAction<Statistics[]>
) => {
	state.statisticsLists.consultations.list = action.payload;
	state.statisticsLists.consultations.status = 'idle';
};

export const getConsultationsStatisticsRejected = (state: StatisticsState) => {
	state.statisticsLists.consultations.list = [];
	state.statisticsLists.consultations.status = 'idle';
};

// заказы с использованием промокода

export const getOrdersStatisticsPending = (state: StatisticsState) => {
	state.statisticsLists.orders.status = 'loading';
};

export const getOrdersStatisticsFullfilled = (
	state: StatisticsState,
	action: PayloadAction<Statistics[]>
) => {
	state.statisticsLists.orders.list = action.payload;
	state.statisticsLists.orders.status = 'idle';
};

export const getOrdersStatisticsRejected = (state: StatisticsState) => {
	state.statisticsLists.orders.list = [];
	state.statisticsLists.orders.status = 'idle';
};
