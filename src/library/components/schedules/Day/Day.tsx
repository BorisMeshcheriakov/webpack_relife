import React from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { OriginSchedule } from 'library/models/schedules';

import { useDay, useInitial } from 'library/hooks/schedules';

import { Session } from './frames';

import st from './Day.module.scss';

type Props = {
	onClick: (start: Date, end: Date, consultation: any, busy?: OriginSchedule) => void;
};

const Day: React.FC<Props> = ({ onClick }) => {
	useInitial('consultations');
	const { date, sessions, getConsultation, getBusy, loadStatus } = useDay();
	return (
		<div className={st.day}>
			<section className={st.weekday}>{format(date, 'cccc', { locale: ru })}</section>
			<section className={st.calendar}>
				{sessions.map((session) => (
					<Session
						key={session.start.toLocaleTimeString()}
						start={session.start}
						end={session.end}
						consultation={getConsultation(session)}
						busy={getBusy(session)}
						loadStatus={loadStatus}
						onClick={() =>
							onClick(session.start, session.end, getConsultation(session), getBusy(session))
						}
					/>
				))}
			</section>
		</div>
	);
};

export default Day;
