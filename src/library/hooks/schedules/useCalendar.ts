import { useHistory, useRouteMatch } from 'react-router-dom';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';

const useCalendar = () => {
	const { url } = useRouteMatch();
	const { push } = useHistory();

	const onClick = (
		start: Date,
		end: Date,
		consultation: CoachAvailablePeriods,
		busy?: OriginSchedule
	) => {
		if (busy && busy.consultation_id) {
			push(`${url}/consultation/busy/${busy.consultation_id}`);
		}
	};

	return {
		onClick,
	};
};

export default useCalendar;
