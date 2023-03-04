import { CoachAvailablePeriods, Consultation } from 'library/models/schedules';
import { Coach, IAm } from 'library/models/users';
import { differenceInMinutes, parseISO } from 'date-fns';

const canMoveConsultation = (
	user: Coach | IAm,
	schedule: CoachAvailablePeriods,
	consultation: Consultation
) => {
	const { start_time, end_time, type, cost } = consultation;
	const {
		consultation_cost,
		consultation_duration,
		consultation_offline_cost,
		consultation_offline_duration,
	} = user;
	const { status } = schedule;

	const onlineCost = consultation_cost ?? 0;
	const onlineDuration = consultation_duration ? parseFloat(consultation_duration) * 30 : 0;
	const offlineCost = consultation_offline_cost ?? 0;
	const offlineDuration = consultation_offline_duration
		? parseFloat(consultation_offline_duration) * 30
		: 0;

	const consultationDuration = differenceInMinutes(parseISO(end_time), parseISO(start_time));

	// В выбранной ячейке нет запланированной консультации соответствующего типа
	if (status.indexOf(type) === -1) return false;

	// Проверяем параметры консультации соответствующего типа
	if (type === 'ON') return cost.amount === onlineCost && consultationDuration === onlineDuration;
	if (type === 'OF') return cost.amount === offlineCost && consultationDuration === offlineDuration;

	return false;
};

export default canMoveConsultation;
