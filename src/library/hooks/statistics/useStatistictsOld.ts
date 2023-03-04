import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { shopService } from 'library/api/shopService';

const useStatisticts = () => {
	const { search } = useLocation();

	const [selectedMonth, setSelectedMonth] = useState(() => DateTime.now());
	const [selectedYear, setSelectedYear] = useState(() => DateTime.now());

	const isNextDisabled = () => {
		let { tab } = qs.parse(search);
		const now = DateTime.now();
		return tab === 'year' ? selectedYear.year === now.year : selectedMonth.month === now.month;
	};

	const switchView = () => {
		let params = qs.parse(search);
		params = { ...params, view: params.view === 'column' ? 'graph' : 'column' };
		return qs.stringify(params);
	};

	const changeTime = (action: string) => {
		const unit = qs.parse(search).tab;
		if (unit === 'year') {
			if (action === 'increment') {
				setSelectedYear((year) => year.plus({ years: 1 }));
			}

			if (action === 'decrement') {
				setSelectedYear((year) => year.minus({ years: 1 }));
			}
		}

		if (unit === 'month') {
			if (action === 'increment') {
				setSelectedMonth((month) => month.plus({ months: 1 }));
			}

			if (action === 'decrement') {
				setSelectedMonth((month) => month.minus({ months: 1 }));
			}
		}
	};

	useEffect(() => {
		const getBaseTransaction = async () => {
			const response = await shopService.getStatYear('2022');
			return response;
		};

		getBaseTransaction();
	}, []);

	return { search, switchView, changeTime, isNextDisabled, selectedYear, selectedMonth };
};

export default useStatisticts;
