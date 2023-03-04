import { getMonth, getYear } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../common';
import { useTabs } from 'library/hooks/schedules';

import { selectDate, changeDate } from 'library/redux/schedules';

import { tabs } from 'library/helpers/schedules';

type Props = {
	date: Date;
};

const useMonthDay = ({ date }: Props) => {
	const dispatch = useAppDispatch();
	const selectedDate = useAppSelector((state) => selectDate(state, 'consultations'));

	const { change } = useTabs();

	const isVisible = () => {
		return getMonth(date) === getMonth(selectedDate) && getYear(date) === getYear(selectedDate);
	};

	const onDaySelect = (date: Date) => {
		dispatch(changeDate({ date: date, calendar: 'consultations' }));
		change(tabs['day'].code);
	};

	return {
		isVisible: isVisible(),
		onDaySelect,
	};
};

export default useMonthDay;
