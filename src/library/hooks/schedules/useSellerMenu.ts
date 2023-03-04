import React from 'react';
import { Consultation } from 'library/models/schedules';

import { useHistory, useRouteMatch } from 'react-router-dom';
import { consultationStatus, ScheduleStatuses } from 'library/helpers/schedules';
import useCancelConsultation from './useCancelConsultation';
import useDeleteConsultation from './useDeleteConsultation';
import useMoveSpecialist from './useMoveSpecialist';
import useMeeting from './useMeeting';

type Props = {
	consultation: Consultation;
};

const useSellerMenu = ({ consultation }: Props) => {
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const { cancelConsultation } = useCancelConsultation();
	const { deleteConsultation } = useDeleteConsultation();
	const { confirmMove, startMoveDialog } = useMoveSpecialist();
	const { connectMeeting } = useMeeting();

	const getActions = React.useCallback(
		(consultation: Consultation) => {
			const actions: {
				[x: string]: {
					title: string;
					action: () => void;
				};
			} = {
				remindPay: {
					title: 'Оповестить',
					action: () => push(`${url}/remind-pay`),
				},
				remindMove: {
					title: 'Оповестить',
					action: () => push(`${url}/remind-move`),
				},
				connect: {
					title: 'Подключиться',
					action: () => connectMeeting(consultation),
				},
				cancel: {
					title: 'Отменить',
					action: () => cancelConsultation(consultation.id),
				},
				move: {
					title: 'Перенести',
					action: () => startMoveDialog(),
				},
				confirm: {
					title: 'Подтвердить',
					action: () => confirmMove(consultation.schedule.changing_time_process.schedule!),
				},
				delete: {
					title: 'Удалить',
					action: () => deleteConsultation(consultation.id),
				},
			};

			let actionsArr: string[] = [];

			const status = consultationStatus(consultation);

			if (status === ScheduleStatuses.notPayed) {
				actionsArr.push('remindPay');
			}

			if (status === ScheduleStatuses.cancelled) {
				actionsArr.push('delete');
			}

			if (status === ScheduleStatuses.confirmed) {
				// actionsArr.push('move');
				actionsArr.push('connect');
				actionsArr.push('cancel');
			}

			if (
				status === ScheduleStatuses.unconfirmed &&
				consultation.schedule.changing_time_process.initiator === 'P'
			) {
				actionsArr.push('confirm');
			}

			if (
				status === ScheduleStatuses.unconfirmed &&
				consultation.schedule.changing_time_process.initiator === 'C'
			) {
				actionsArr.push('remindMove');
			}

			return actionsArr.map((action: string) => actions[action]);
		},
		[
			push,
			url,
			connectMeeting,
			cancelConsultation,
			startMoveDialog,
			confirmMove,
			deleteConsultation,
		]
	);

	return { actions: getActions(consultation) };
};

export default useSellerMenu;
