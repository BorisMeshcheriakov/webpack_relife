import React from 'react';
import { format } from 'date-fns';
import { Session } from 'library/components/schedules';
import { useInitial, useWeek } from 'library/hooks/schedules';
import { Calendar } from 'library/types/schedules';
import { OriginSchedule } from 'library/models/schedules';

import { Day, Hour } from './frames';

import st from './Week.module.scss';

interface Props {
	calendar: Calendar;
	onClick: (start: Date, end: Date, consultation: any, busy?: OriginSchedule) => void;
}

const Week: React.FC<Props> = ({ calendar, onClick }) => {
	useInitial(calendar);
	const { week, hours, sessions, clear, getConsultation, getBusy, canUpdate, mode, status } =
		useWeek({
			calendar,
		});

	return (
		<div className={st.week} onMouseLeave={clear}>
			<section className={st.weekdays}>
				{week.map((day) => (
					<div key={format(day, 'EEEEEE dd')} className={st.weekdays__day}>
						<Day day={day} />
					</div>
				))}
			</section>

			<section className={st.calendar}>
				<div className={st.calendar__hours}>
					{hours.map((hour) => (
						<Hour key={hour} hour={hour} calendar={calendar} />
					))}
				</div>
				<div className={st.calendar__sessions}>
					{sessions.map((day) => (
						<div key={format(day[0].start, 'ddMMyyyy')} className={st.calendar__column}>
							{day.map((session) => (
								<div className={st.calendar__session} key={format(session.start, 'ddMMyyHHmm')}>
									<Session
										start={session.start}
										end={session.end}
										calendar={calendar}
										consultation={getConsultation(session)}
										busy={getBusy(session)}
										canUpdate={canUpdate}
										mode={mode}
										loadStatus={status}
										onClick={() =>
											onClick(
												session.start,
												session.end,
												getConsultation(session),
												getBusy(session)
											)
										}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Week;
