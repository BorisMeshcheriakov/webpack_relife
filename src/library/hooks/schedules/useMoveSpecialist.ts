import React from 'react';
import { CoachAvailablePeriods, Consultation, OriginSchedule } from 'library/models/schedules';
import { useAppDispatch, useAppSelector } from '../common';
import { changeActiveConsultation, selectActiveConsultation } from 'library/redux/schedules';
import { canMoveConsultation } from 'library/helpers/schedules';
import { useUser } from '../user';
import { openDialogModal, openNotifyModal, showPopup } from 'library/redux/modal';
import { schedulesService } from 'library/api/schedulesService';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { differenceInMinutes, format, parseISO } from 'date-fns';
import { getInitial } from 'library/helpers/user';
import { setMode } from 'library/redux/specialists';

const useMoveSpecialist = () => {
	const dispatch = useAppDispatch();
	const consultation = useAppSelector(selectActiveConsultation);

	const [step, setStep] = React.useState(0);
	const [schedule, setSchedule] = React.useState<CoachAvailablePeriods | null>(null);
	const { user } = useUser();
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const { scheduleType, scheduleId } = useParams<{ [x: string]: string }>();

	const moveConsultation = async (
		consultation: Consultation | null,
		schedule: CoachAvailablePeriods | null
	) => {
		if (!schedule || !consultation) return;
		try {
			const data = {
				origin_schedule: consultation.schedule.id,
				start_time: schedule.start_time,
				duration: differenceInMinutes(
					parseISO(consultation.end_time),
					parseISO(consultation.start_time)
				),
				reason_to_change: '',
			};
			const response = await schedulesService.changeTime(data);

			if (!response.data) throw response;

			if (user?.is_coach) {
				const updatedConsultation = {
					...consultation,
					confirmed: false,
					start_time: schedule.start_time,
					end_time: schedule.end_time,
					schedule: {
						changing_time_process: {
							flag: true,
							initiator: 'C',
							// TODO добавить id запроса на перенос
						},
					},
				};

				dispatch(changeActiveConsultation(updatedConsultation as Consultation));
				dispatch(
					openDialogModal({
						title: 'Консультация перенесена',
						text: `Необходимо подтверждение ${
							user?.is_coach ? 'клиента' : 'специалиста'
						} \n Отправить приглашение?`,
						confirm: () => push(`${url}/invite-client`),
						decline: () => push(`/schedules/consultation/${scheduleType}/${scheduleId}`),
						confirmText: 'Да',
						declineText: 'Нет',
					})
				);
			}

			if (user?.is_client) {
				const updatedConsultation = {
					...consultation,
					start_time: schedule.start_time,
					end_time: schedule.end_time,
					schedule: {
						...consultation.schedule,
						period: {
							...consultation.schedule.period,
							address: [...schedule.address],
						},
					},
				};

				const { last_name, first_name, middle_name } = consultation.coach;
				dispatch(changeActiveConsultation(updatedConsultation as Consultation));
				dispatch(
					openNotifyModal({
						title: 'Консультация перенесена',
						text: `Вы успешно перенесли консультацию с ${getInitial(
							first_name,
							middle_name,
							last_name
						)} на ${format(parseISO(schedule.start_time), 'dd.MM.yyyy, HH:mm')}`,
						confirmText: 'Ок',
					})
				);
				push(`/schedules/consultation/${scheduleId}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const chooseSchedule = (
		start: Date,
		end: Date,
		schedule: CoachAvailablePeriods,
		busy?: OriginSchedule
	) => {
		if (busy) return;
		if (schedule && user && consultation) {
			if (canMoveConsultation(user.is_coach ? user : consultation.coach, schedule, consultation)) {
				if (schedule.status.indexOf(consultation?.type) !== -1) {
					// console.log(schedule);
					setSchedule(schedule);
					setStep(1);
				} else {
					dispatch(showPopup({ type: 'message', text: 'Неподходящий тип консультации' }));
				}
			} else {
				dispatch(showPopup({ type: 'message', text: 'Невозможно перенести консультацию' }));
			}
		}
	};

	const confirmMove = async (id: number) => {
		try {
			const response = await schedulesService.acceptChange(id);
			if (!response.data) throw response;
			dispatch(setMode('ON'));
		} catch (error) {
			console.error(error);
		}
	};

	const startMoveDialog = () => {
		dispatch(
			openDialogModal({
				title: 'Перенос консультации',
				text: 'Вы можете перенести консультацию самостоятельно или предложить клиенту выбрать другое время',
				confirm: () => push(`${url}/change-time`),
				decline: () => push(`${url}/suggest-change`),
				confirmText: 'Перенести',
				declineText: 'Предложить клиенту',
			})
		);
	};

	React.useEffect(() => {
		if (consultation) dispatch(setMode(consultation.type));
	}, [consultation, dispatch]);

	return {
		step,
		schedule,
		consultation,
		chooseSchedule,
		moveConsultation: () => moveConsultation(consultation, schedule),
		confirmMove,
		startMoveDialog,
	};
};

export default useMoveSpecialist;
