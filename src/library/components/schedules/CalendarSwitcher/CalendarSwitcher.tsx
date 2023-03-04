import React from 'react';

import { useCalendar, useTabs } from 'library/hooks/schedules';

import Week from '../Week';
import Month from '../Month';
import Day from '../Day';

const CalendarSwitcher: React.FC = () => {
	const { selected } = useTabs();
	const { onClick } = useCalendar();

	switch (selected) {
		case 'week':
			return <Week calendar="consultations" onClick={onClick} />;
		case 'month':
			return <Month />;
		case 'day':
			return <Day onClick={onClick} />;
		default:
			return <></>;
	}
};

export default CalendarSwitcher;
