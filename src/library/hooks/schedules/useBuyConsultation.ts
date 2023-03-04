import React from 'react';
import { differenceInMinutes, parseISO } from 'date-fns';
import { schedulesService } from 'library/api/schedulesService';
import { CoachAvailablePeriods, Consultation } from 'library/models/schedules';
import { Coach } from 'library/models/users';
import { ModeCode } from 'library/types/schedules';
import { useCertificateMessage } from '../common';

const useBuyConsultation = () => {
	const [status, setStatus] = React.useState('idle');

	const { onRedirect } = useCertificateMessage();

	const buyConsultation = async (consultation: Consultation) => {
		setStatus('processing');
		try {
			const data = {
				start_time: consultation.start_time,
				consultation_type: consultation.type,
				coach: consultation.coach.id,
				duration: differenceInMinutes(
					parseISO(consultation.end_time),
					parseISO(consultation.start_time)
				),
			};
			const response = await schedulesService.buyConsultation(data);
			if (response.data.redirect_url) {
				onRedirect(response.data.redirect_url);
			}
		} catch (error) {
			console.error(error);
		}
		setStatus('idle');
	};

	const buySchedule = async (schedule: CoachAvailablePeriods, type: ModeCode, coach: Coach) => {
		try {
			const data = {
				start_time: schedule.start_time,
				consultation_type: type,
				coach: coach.id,
				duration: differenceInMinutes(parseISO(schedule.end_time), parseISO(schedule.start_time)),
			};
			const response = await schedulesService.buyConsultation(data);
			window.location.href = response.data.redirect_url;
		} catch (error) {
			console.error(error);
		}
	};
	return {
		buyConsultation,
		buySchedule,
		status,
	};
};

export default useBuyConsultation;
