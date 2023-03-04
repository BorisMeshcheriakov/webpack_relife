import { DateTime } from 'luxon';
import { parseISO, startOfDay, isEqual } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { useAppSelector } from 'library/hooks/common';
import { selectTimezone } from 'library/redux/schedules';

import Scroller from './frames/Scroller';
import Offline from './frames/Offline';

import st from './index.module.scss';

const Sessions = ({ sessions, selected, mode, onSessionClick }) => {
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	function filterSessions(sessions, mode, start) {
		try {
			let dayStart = startOfDay(start);

			function getSessionStart(session) {
				return startOfDay(utcToZonedTime(parseISO(session.start_time), tz));
			}

			sessions = sessions
				.filter(
					(session) =>
						session.status.indexOf(mode) !== -1 && isEqual(dayStart, getSessionStart(session))
				)
				.sort((a, b) => {
					let first = DateTime.fromISO(a.start_time).valueOf();
					let second = DateTime.fromISO(b.start_time).valueOf();
					return first - second;
				});
			return sessions;
		} catch (error) {
			console.error(error);
		}
	}

	const filteredSessions = filterSessions(sessions, mode, selected);

	return (
		<>
			{mode === 'ON' &&
				(filteredSessions.length > 0 ? (
					<Scroller sessions={filteredSessions} onSessionClick={onSessionClick} quantity={42} />
				) : (
					<div className={st.message}>Нет свободного времени</div>
				))}
			{mode === 'OF' &&
				(filteredSessions.length > 0 ? (
					<Offline
						Scroller={(props) => <Scroller {...props} />}
						sessions={filteredSessions}
						onSessionClick={onSessionClick}
					/>
				) : (
					<div className={st.message}>Нет свободного времени</div>
				))}
		</>
	);
};

export default Sessions;
