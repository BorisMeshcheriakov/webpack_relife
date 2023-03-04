import React from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { format, isToday } from 'date-fns';

import { useMonthDay } from 'library/hooks/schedules';

import st from './Day.module.scss';

import { modes, sessionWord } from 'library/helpers/schedules';

type Props = {
	date: Date;
	sessions: {
		online: number;
		offline: number;
	};
};

const Day: React.FC<Props> = ({ date, sessions }) => {
	const { isVisible, onDaySelect } = useMonthDay({ date });

	return (
		<div
			className={cn(st.day, isToday(date) && st.today, !isVisible && st.invisible)}
			onClick={() => onDaySelect(date)}
		>
			<h3>{format(date, 'd')}</h3>
			<div className={st.sessions}>
				{sessions.online > 0 && (
					<div className={st.sessions__session}>
						<SVG src={modes['ON'].icon} />
						<span>{`${sessions.online} ${sessionWord(sessions.online)}`}</span>
					</div>
				)}

				{sessions.offline > 0 && (
					<div className={st.sessions__session}>
						<SVG src={modes['OF'].icon} />
						<span>{`${sessions.offline} ${sessionWord(sessions.offline)}`}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Day;
