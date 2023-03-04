import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../common';
import {
	getConsultationsStatistics,
	getEventsStatistics,
	getOrdersStatistics,
	getProgramsStatistics,
	selectStatisticsMemo,
} from 'library/redux/statistics';

const useLoadStatisitcs = () => {
	const dispatch = useAppDispatch();

	const { tab, date } = useAppSelector(selectStatisticsMemo);

	useEffect(() => {
		dispatch(getProgramsStatistics({ mode: tab.code, date: date }));
		dispatch(getEventsStatistics({ mode: tab.code, date: date }));
		dispatch(getConsultationsStatistics({ mode: tab.code, date: date }));
		dispatch(getOrdersStatistics({ mode: tab.code, date: date }));
	}, [tab, date, dispatch]);

	return {};
};

export default useLoadStatisitcs;
