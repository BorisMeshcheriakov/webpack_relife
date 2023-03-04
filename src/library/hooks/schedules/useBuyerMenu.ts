import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Consultation } from 'library/models/schedules';

import { useBuyConsultation, useCancelConsultation, useMeeting } from 'library/hooks/schedules';

import { consultationStatus, ScheduleStatuses } from 'library/helpers/schedules';

type Props = {
	consultation: Consultation;
};

const useBuyerMenu = ({ consultation }: Props) => {
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const { buyConsultation } = useBuyConsultation();
	const { cancelConsultation } = useCancelConsultation();
	const { connectMeeting } = useMeeting();

	const getActions = React.useCallback(
		(consultation: Consultation) => {
			const actions: {
				[x: string]: {
					title: string;
					action: () => void;
				};
			} = {
				message: {
					title: 'Оповестить',
					action: () => push(`${url}/remind`),
				},
				connect: {
					title: 'Подключиться',
					action: () => connectMeeting(consultation),
				},
				move: {
					title: 'Перенести',
					action: () => push(`${url}/change-time-coach/${consultation.coach.id}`),
				},
				confirm: {
					title: 'Подтвердить',
					action: () => push(`${url}/confirm-change`),
				},
				buy: {
					title: 'Оплатить',
					action: () => buyConsultation(consultation),
				},
				cancel: {
					title: 'Отменить',
					action: () => cancelConsultation(consultation.id),
				},
			};

			let actionsArr: string[] = [];

			const status = consultationStatus(consultation);

			if (status === ScheduleStatuses.notPayed) {
				actionsArr.push('buy');
			}

			if (status === ScheduleStatuses.confirmed) {
				actionsArr.push('connect');
				actionsArr.push('move');
				actionsArr.push('cancel');
			}

			if (
				status === ScheduleStatuses.unconfirmed &&
				consultation.schedule.changing_time_process.initiator === 'C'
			) {
				actionsArr.push('confirm');
			}

			return actionsArr.map((action: string) => actions[action]);
		},
		[buyConsultation, cancelConsultation, connectMeeting, push, url]
	);

	return { actions: getActions(consultation) };
};

export default useBuyerMenu;
