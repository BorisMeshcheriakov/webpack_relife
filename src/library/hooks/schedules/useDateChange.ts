import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { addWeeks, subWeeks } from 'date-fns';
import { useUser } from 'library/hooks/user';
import {
	changeDate,
	getConsultations,
	selectDate,
	selectTab,
	selectTimezone,
} from 'library/redux/schedules';
import { Calendar } from 'library/types/schedules';
import useTabs from './useTabs';
import { tabs } from 'library/helpers/schedules';

const useDateChange = (calendar: Calendar) => {
	const dispatch = useAppDispatch();
	const date = useAppSelector((state) => selectDate(state, calendar));
	const tz = useAppSelector((state) => selectTimezone(state, calendar));
	const tab = useAppSelector(selectTab);
	const { user } = useUser();
	const { selected } = useTabs();

	const setDate = (date: Date, action: 'add' | 'subtract' | 'reset') => {
		let changedDate = new Date();
		switch (action) {
			case 'add':
				changedDate =
					calendar === 'consultations' ? tabs[selected].add(date, 1) : addWeeks(date, 1);
				break;

			case 'subtract':
				changedDate =
					calendar === 'consultations' ? tabs[selected].subtract(date, 1) : subWeeks(date, 1);
				break;
			case 'reset':
				changedDate = new Date();
				break;
			default:
				break;
		}

		dispatch(changeDate({ date: changedDate, calendar: calendar }));
		dispatch(
			getConsultations({
				date: changedDate,
				tab: calendar === 'consultations' ? tab : 'week',
				id: user?.user?.id!,
				calendar,
				tz,
			})
		);
	};
	return {
		date,
		change: setDate,
	};
};

export default useDateChange;
