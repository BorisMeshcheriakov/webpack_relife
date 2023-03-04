import React from 'react';
import cn from 'classnames';
import { addMonths, format, startOfDay, subDays, subMonths } from 'date-fns';
import { addDays } from 'date-fns/esm';
import ru from 'date-fns/locale/ru';

import st from './CalendarToolbar.module.scss';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

type Props = {
	start: Date;
	selected: Date;
	setStart: (date: Date) => void;
	setSelected: (date: Date) => void;
	showCalendar: boolean;
};

const CalendarToolbar: React.FC<Props> = ({
	start,
	setStart,
	setSelected,
	showCalendar,
	selected,
}) => {
	const onForward = (date: Date) => {
		date = showCalendar ? addMonths(date, 1) : addDays(date, 1);
		setStart(date);
		setSelected(date);
	};

	const onBackward = (date: Date) => {
		date = showCalendar ? subMonths(date, 1) : subDays(date, 1);
		setStart(date);
		setSelected(date);
	};

	const onToday = () => {
		const date = new Date();
		setStart(date);
		setSelected(date);
	};

	const isTodayActive = (date: Date) =>
		startOfDay(date).valueOf() === startOfDay(new Date()).valueOf();

	return (
		<div className={st.date}>
			<div className={st.date__date}>
				{format(start, showCalendar ? 'LLLL yyyy' : `EEEEEE, dd MMMM yyyy`, { locale: ru })}
			</div>
			<div className={st.date__buttons}>
				<button className={cn(st.btn, st.arrow)} onClick={() => onBackward(start)}>
					<ArrowBackIosNew fontSize="small" />
				</button>
				<button className={cn(st.btn, st.arrow)} onClick={() => onForward(start)}>
					<ArrowForwardIos fontSize="small" />
				</button>
				<button className={cn(st.btn, isTodayActive(selected) && st.active)} onClick={onToday}>
					Сегодня
				</button>
			</div>
		</div>
	);
};

export default CalendarToolbar;
