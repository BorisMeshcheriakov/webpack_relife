import { addMinutes, format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { canCreate, timeFormat } from 'library/helpers/schedules';
import { CoachAvailablePeriods } from 'library/models/schedules';
import { addMockSession, selectMode, selectOpen, selectTimezone } from 'library/redux/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';
import { Calendar } from 'library/types/schedules';
import { useAppDispatch, useAppSelector } from '../common';

const useHover = (start: Date, end: Date, consultation: any, busy: any, calendar: Calendar) => {
	const dispatch = useAppDispatch();
	const mode = useAppSelector(selectMode);
	const settings = useAppSelector(selectConsultationSettings);
	const open = useAppSelector((state) => selectOpen(state, calendar));
	const tz = useAppSelector((state) => selectTimezone(state, calendar));

	const onEnter = () => {
		if (calendar !== 'editor' || !settings) return;

		if (!busy) {
			if (!consultation) {
				// Пустая ячейка - проверяем возможность создания консультации
				const session = {
					start_time: format(start, timeFormat),
					end_time: format(addMinutes(start, settings[mode].duration * 30), timeFormat),
					status: [mode],
					address: [],
				} as CoachAvailablePeriods;

				if (canCreate(session, open, tz)) {
					dispatch(addMockSession(session));
				} else {
					dispatch(addMockSession(null));
				}
			} else {
				// В ячейке есть консультация - проверяем возможность редактирования
				const { start_time, end_time } = consultation;
				const start = format(utcToZonedTime(parseISO(start_time), tz), timeFormat);
				const end = format(utcToZonedTime(parseISO(end_time), tz), timeFormat);

				let session = { ...consultation, start_time: start, end_time: end };
				let status = [...session.status];
				let idx = status.findIndex((stat) => stat === mode);

				// Редактирование можно только при одинаковой продолжительности онлайн и оффлайн консультаций
				if (settings['ON'].duration === settings['OF'].duration) {
					if (idx === -1) {
						status.push(mode);
					} else {
						status.splice(idx, 1);
					}
				} else {
					status = [];
				}

				session = { ...session, status: status };
				dispatch(addMockSession(session));
			}
		} else {
			// Ячейка занята
			dispatch(addMockSession(null));
		}
	};

	const onLeave = () => {
		if (calendar === 'editor') dispatch(addMockSession(null));
	};

	return {
		onEnter,
		onLeave,
	};
};

export default useHover;
