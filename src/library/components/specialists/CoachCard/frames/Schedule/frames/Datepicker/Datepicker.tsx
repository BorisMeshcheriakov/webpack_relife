import Day from './frames/Day';

import { useAppSelector } from 'library/hooks/common';
import { selectTimezone } from 'library/redux/schedules';

import st from './Datepicker.module.scss';
import {
	endOfMonth,
	startOfMonth,
	startOfWeek,
	addDays,
	endOfWeek,
	startOfDay,
	parseISO,
	format,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

type Props = {
	start: Date;
	setStart: any;
	setSelected: any;
	setShowCalendar: any;
	sessions: any[];
	mode: 'ON' | 'OF';
	now: Date;
};

const Datepicker: React.FC<Props> = ({
	start,
	setSelected,
	setShowCalendar,
	sessions,
	mode = 'ON',
	now,
}) => {
	const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	const createMonthDates = () => {
		const calendarStart = startOfWeek(startOfMonth(start), { weekStartsOn: 1 });
		const calendarEnd = endOfWeek(endOfMonth(start), { weekStartsOn: 1 });

		// получаем все даты месяца
		const month = [];
		let current = calendarStart;
		while (current < calendarEnd) {
			month.push(current);
			current = addDays(current, 1);
		}

		// разбиваем на недели
		const weeks = [];
		while (month.length > 0) {
			weeks.push(month.splice(0, 7));
		}

		return weeks;
	};

	const selectDate = (date: any) => {
		setSelected(date);
		setShowCalendar(false);
	};

	const getDaysHighlight = (sessions: any[], mode: any) =>
		sessions
			.filter((session) => session.status.indexOf(mode) !== -1)
			.map((session) => startOfDay(utcToZonedTime(parseISO(session.start_time), tz)));

	return (
		<div className={st.calendar}>
			<section className={st.weekdays}>
				{weekdays.map((day) => (
					<div className={st.weekdays__day} key={day}>
						{day}
					</div>
				))}
			</section>
			<section className={st.weeks}>
				{createMonthDates().map((week) => (
					<div className={st.weeks__week} key={format(week[0], 'dd')}>
						{week.map((day) => (
							<Day
								date={day}
								now={now}
								key={format(day, 'ddd')}
								start={start}
								select={selectDate}
								highlight={getDaysHighlight(sessions, mode)}
							/>
						))}
					</div>
				))}
			</section>
		</div>
	);
};

export default Datepicker;
