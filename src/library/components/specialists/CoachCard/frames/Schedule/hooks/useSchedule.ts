import React from 'react';
import qs from 'query-string';
import { endOfMonth, format, startOfMonth, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { schedulesService } from 'library/api/schedulesService';

import { useOnScreen } from 'library/hooks/common/hooks';

import { useAppSelector } from 'library/hooks/common';
import { selectTimezone } from 'library/redux/schedules';

type Props = {
	id: number;
};

const useVisibleLoad = ({ id }: Props) => {
	const now = React.useMemo(() => new Date(), []);

	const [start, setStart] = React.useState(now);
	const [isLoading, setIsLoading] = React.useState(false);
	const [selected, setSelected] = React.useState(now);
	const [sessions, setSessions] = React.useState<any[]>([]);

	const cardRef = React.useRef<any>();
	const isVisible = useOnScreen(cardRef);

	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	const getCoachSessions = React.useCallback(
		async (time) => {
			setIsLoading(true);
			const begin = startOfMonth(time);
			const end = endOfMonth(time);
			const beginISO = format(zonedTimeToUtc(begin, tz), "yyyy-MM-dd'T'HH:mm");
			const endISO = format(zonedTimeToUtc(end, tz), "yyyy-MM-dd'T'HH:mm");
			const openQuery = qs.stringify({
				start_time: beginISO,
				end_time: endISO,
				coach: id,
				transaction_payed: false,
			});
			const busyQuery = qs.stringify({ start_time: beginISO, end_time: endISO, coach: id });
			Promise.all([
				schedulesService.getOpenSchedules(openQuery),
				schedulesService.getBusySchedules(busyQuery),
			])
				.then((res) => {
					const openSessions = [...res[0].data];
					const busySessions = [...res[1].data];
					let combinedSessions = [];
					combinedSessions = openSessions.filter((open) => parseISO(open.start_time) >= now);
					combinedSessions = combinedSessions.filter(
						(combined) =>
							busySessions.findIndex((busy) => busy.start_time === combined.start_time) === -1
					);
					setSessions(combinedSessions);
					setIsLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setIsLoading(false);
				});
		},
		[id, now, tz]
	);

	React.useEffect(() => {
		if (isVisible && id) {
			getCoachSessions(start);
		}
	}, [start, isVisible, id, getCoachSessions]);

	return {
		isLoading,
		start,
		setStart,
		selected,
		setSelected,
		cardRef,
		sessions,
		now,
	};
};

export default useVisibleLoad;
