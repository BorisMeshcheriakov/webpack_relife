import React from 'react';

import { format } from 'date-fns';
import { useInitial, useMonth } from 'library/hooks/schedules';

import { WeekDay, Day } from './frames';

import st from './Month.module.scss';

const Month: React.FC = () => {
	useInitial('consultations');
	const { week, month, getSessions } = useMonth();

	return (
		<div className={st.month}>
			<section className={st.weekdays}>
				{week.map((day) => (
					<div key={format(day, 'EEEEEE dd')} className={st.weekdays__day}>
						<WeekDay day={day} />
					</div>
				))}
			</section>
			<section className={st.calendar}>
				{month.map((week, index) => (
					<div key={index} className={st.calendar__week}>
						{week.map((day) => (
							<Day key={format(day, 'ddMM')} date={day} sessions={getSessions(day)} />
						))}
					</div>
				))}
			</section>
		</div>
	);
};

export default Month;
