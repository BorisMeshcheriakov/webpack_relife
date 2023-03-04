import { Consultation } from 'library/models/schedules';
import { ScheduleStatuses } from './constants';

const consultationStatus = (consultation: Consultation) => {
	let status = ScheduleStatuses.notPayed;

	if (consultation.payed.payed && consultation.confirmed) {
		status = ScheduleStatuses.confirmed;
	}

	if (consultation.cancelled) {
		status = ScheduleStatuses.cancelled;
	}

	if (!consultation.payed.payed && consultation.payed.transaction) {
		status = ScheduleStatuses.paymentAwaiting;
	}

	if (!consultation.payed.payed && !consultation.payed.transaction) {
		status = ScheduleStatuses.notPayed;
	}

	if (consultation.payed.payed && !consultation.confirmed) {
		status = ScheduleStatuses.unconfirmed;
	}

	return status;
};

export default consultationStatus;
