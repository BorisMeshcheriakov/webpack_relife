import {
	addMonths,
	getDate,
	lastDayOfMonth,
	parseISO,
	startOfYear,
	startOfMonth,
	addDays,
	lastDayOfYear,
} from 'date-fns';
import { getCurrentDayDate } from 'library/helpers/statistics/statisticsDate';
import { Statistics } from 'library/models/statistics';
import { List, Tab } from 'library/types/statistics';
import { useMemo } from 'react';

interface Props {
	statistics: List;
	tab: Tab;
	date: string;
}

const useStatisticsGraphics = ({ statistics, tab, date }: Props) => {
	const memoInfo = useMemo(() => {
		return {
			count: statistics.list.reduce((a: number, b: Statistics) => a + b.count, 0),
			amount: statistics.list.reduce(
				(a: number, b: Statistics) => (b.amount ? a + b.amount : 0),

				0
			),
		};
	}, [statistics.list]);

	const nullableList = useMemo(() => {
		let parseDate = parseISO(date);
		return [
			{
				count: 0,
				amount: 0,
				date:
					tab.code === 'year'
						? getCurrentDayDate(startOfYear(parseDate))
						: getCurrentDayDate(startOfMonth(parseDate)),
			},
			{
				count: 0,
				amount: 0,
				date:
					tab.code === 'year'
						? getCurrentDayDate(lastDayOfYear(parseDate))
						: getCurrentDayDate(lastDayOfMonth(parseDate)),
			},
		] as Statistics[];
	}, [date, tab.code]);

	const normalizeList = useMemo(() => {
		let parseDate = parseISO(date);
		const statisticsLength = tab.code === 'year' ? 12 : getDate(lastDayOfMonth(parseISO(date)));
		const normalizeStatistics = [...new Array(statisticsLength)].map(
			(item, index) =>
				(item = {
					count: 0,
					amount: 0,
					date:
						tab.code === 'year'
							? getCurrentDayDate(addMonths(startOfYear(parseDate), index))
							: getCurrentDayDate(addDays(startOfMonth(parseDate), index)),
				})
		);

		return normalizeStatistics.map((item) => {
			const findEl = statistics.list.find((el) =>
				tab.code === 'year' ? el.month === item.date : el.date === item.date
			);
			return findEl
				? (item = {
						count: findEl.count,
						amount: findEl.amount,
						date: tab.code === 'year' ? findEl.month : findEl.date,
				  })
				: item;
		}) as Statistics[];
	}, [date, statistics.list, tab.code]);

	return { memoInfo, normalizeList, nullableList };
};

export default useStatisticsGraphics;
