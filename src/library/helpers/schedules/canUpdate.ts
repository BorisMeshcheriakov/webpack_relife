import { CoachAvailablePeriods } from 'library/models/schedules';
import { ModeCode } from 'library/types/schedules';

const canUpdateStatus = (consultation: CoachAvailablePeriods, mode: ModeCode) => {
	let session = { ...consultation };
	let status = [...session.status];
	return status.length > 1 || !!status.find((stat) => stat !== mode);
};

export default canUpdateStatus;
