import React from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Calendar, TabCode } from 'library/types/schedules';

import { useAppSelector } from 'library/hooks/common';
import { selectTab } from 'library/redux/schedules';

import { useDateChange } from 'library/hooks/schedules';

import st from './Date.module.scss';
import { tabs } from 'library/helpers/schedules';

type Props = {
	calendar: Calendar;
};

const Date: React.FC<Props> = ({ calendar }) => {
	const { date } = useDateChange(calendar);
	const tab = useAppSelector(selectTab);

	const getFormat = (tab: TabCode) => {
		let format = tabs['day'].format;

		switch (tab) {
			case 'week':
			case 'month':
				format = tabs['week'].format;
				break;
			case 'day':
				format = tabs['day'].format;
				break;
			default:
				format = tabs['day'].format;
				break;
		}

		if (calendar === 'editor') format = tabs['month'].format;

		return format;
	};

	return <div className={st.date}>{format(date, getFormat(tab), { locale: ru })}</div>;
};

export default Date;
