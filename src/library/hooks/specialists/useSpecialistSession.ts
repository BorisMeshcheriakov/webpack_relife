import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { CoachAvailablePeriods } from 'library/models/schedules';

const useSpecialistSession = () => {
	const { push } = useHistory();
	const { url } = useRouteMatch();

	const [schedule, setSchedule] = React.useState<CoachAvailablePeriods | null>(null);

	const onScheduleClick = (schedule: CoachAvailablePeriods) => {
		setSchedule(schedule);
		push(`${url}/buy-consultation/${schedule.coach?.id}/${schedule.id}`);
	};
	return {
		schedule,
		onScheduleClick,
	};
};

export default useSpecialistSession;
