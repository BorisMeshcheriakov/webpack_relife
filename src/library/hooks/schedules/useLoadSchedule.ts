import React from 'react';
import { schedulesService } from 'library/api/schedulesService';
import { CoachAvailablePeriods } from 'library/models/schedules';

type Props = {
	id: string | number | null;
};

/**
 * Загрузка открытой консультации
 */

const useLoadSchedule = ({ id }: Props) => {
	const [schedule, setSchedule] = React.useState<CoachAvailablePeriods | null>(null);

	React.useEffect(() => {
		// const request = {
		// 	open: schedulesService.getConsultation,
		// 	busy: schedulesService.getBusy,
		// 	consultation: schedulesService.getSession,
		// };

		const getConsultation = async (id: string | number) => {
			const response = await schedulesService.getConsultation(id);
			setSchedule(response.data);
		};

		if (id) getConsultation(id);
		return () => {};
	}, [id]);

	return {
		schedule,
	};
};

export default useLoadSchedule;
