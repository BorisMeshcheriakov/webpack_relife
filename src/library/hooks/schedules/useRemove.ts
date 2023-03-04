import { CoachAvailablePeriods } from 'library/models/schedules';
import { removeConsultation } from 'library/redux/schedules';
import { useAppDispatch } from '../common';

const useRemove = () => {
	const dispatch = useAppDispatch();

	const remove = (consultation: CoachAvailablePeriods) => {
		dispatch(removeConsultation(consultation));
	};

	return {
		remove,
	};
};

export default useRemove;
