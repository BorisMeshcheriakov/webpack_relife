import { addMonths, addYears, isAfter, isFuture, parseISO } from 'date-fns';
import {
	changeStatisticsDate,
	changeStatisticsGraphics,
	resetStatisticsListModal,
	resetStatisticsLists,
	selectStatisticsInfoMemo,
	selectStatisticsMemo,
	setStatisticsTabs,
} from 'library/redux/statistics';
import { BntType, Tab } from 'library/types/statistics';
import { isEqual } from 'lodash';
import { useCallback } from 'react';
import { tabs } from 'library/helpers/statistics/statisticsTabs';
import { useAppDispatch, useAppSelector } from '../common';

const useStatisticsHead = (isModal = false) => {
	const dispatch = useAppDispatch();
	const info = useAppSelector(selectStatisticsInfoMemo, isEqual);
	const { tab, graph, date, statistics } = useAppSelector(selectStatisticsMemo, isEqual);

	const onTabChange = useCallback(
		(tab: Tab) => {
			!isModal ? dispatch(resetStatisticsLists()) : dispatch(resetStatisticsListModal());
			dispatch(setStatisticsTabs({ tab, isModal }));
		},
		[dispatch, isModal]
	);

	const handlerTooltip = useCallback(() => {
		dispatch(changeStatisticsGraphics({ isModal }));
	}, [dispatch, isModal]);

	const handlerButton = useCallback(
		(type: BntType) => {
			dispatch(changeStatisticsDate({ type, isModal }));
		},
		[dispatch, isModal]
	);

	const isDisableBtn = useCallback(
		(type: BntType, distance: number = -10) => {
			// функция отвечает за промежуток выбираемой статистики
			// по умолчанию работает в диопазоне от текущей даты, до (текущей даты -10 лет)
			return type === 'add'
				? !isModal
					? isFuture(
							tab.code === 'year' ? addYears(parseISO(date), 1) : addMonths(parseISO(date), 1)
					  )
					: isFuture(
							statistics.tab.code === 'year'
								? addYears(parseISO(statistics.date), 1)
								: addMonths(parseISO(statistics.date), 1)
					  )
				: !isModal
				? isAfter(
						parseISO(date),
						tab.code === 'year'
							? addYears(new Date(), distance)
							: addMonths(new Date(), distance * 12)
				  )
				: isAfter(
						parseISO(statistics.date),
						statistics.tab.code === 'year'
							? addYears(new Date(), distance)
							: addMonths(new Date(), distance * 12)
				  );
		},
		[date, isModal, statistics.date, statistics.tab.code, tab.code]
	);

	return {
		tabs,
		tab: !isModal ? tab : statistics.tab,
		graph: !isModal ? graph : statistics.graphicsType,
		date: !isModal ? date : statistics.date,
		isDisableBtn,
		handlerTooltip,
		handlerButton,
		onTabChange,
		info,
	};
};

export default useStatisticsHead;
