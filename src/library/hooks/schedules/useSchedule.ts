import React from 'react';
import ru from 'date-fns/locale/ru';
import { differenceInMinutes, format, formatDistanceStrict, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import { CoachAvailablePeriods } from 'library/models/schedules';
import { ModeCode, NormalizedSchedule } from 'library/types/schedules';

import { useAppSelector } from '../common';
import { selectMode, selectTimezone } from 'library/redux/schedules';

import { useLoadClient } from 'library/hooks/clients';
import { useUser } from 'library/hooks/user';
import { useLoadSpecialist } from 'library/hooks/specialists';

import { useAssign, useLoadSchedule, useBuyConsultation } from 'library/hooks/schedules';

import { addressString, ScheduleStatuses } from 'library/helpers/schedules';

type Props = {
	id: string | number | null;
	clientId: any;
	specialistId: string | null;
	close?: () => void;
};

const useSchedule = ({ id, clientId, specialistId, close }: Props) => {
	const { user } = useUser();
	const { schedule } = useLoadSchedule({ id });
	const { client } = useLoadClient({ id: user?.is_coach ? clientId : null });
	const { specialist } = useLoadSpecialist({ id: specialistId });
	const { onAssign } = useAssign();
	const { buySchedule } = useBuyConsultation();
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));
	const coachMode = useAppSelector(selectMode);

	const [mode, setMode] = React.useState<ModeCode>(schedule?.status[0] ?? 'ON');

	const normalizeSchedule = (schedule: CoachAvailablePeriods | null): NormalizedSchedule | null => {
		if (!schedule) return null;

		let scheduleObject = {
			mode: schedule.status,
			status: ScheduleStatuses.assign,
			date: format(parseISO(schedule.start_time), 'dd MMMM yyyy', {
				locale: ru,
			}),
			time: formatInTimeZone(parseISO(schedule.start_time), tz, 'HH:mm (zzz)'),
			duration: formatDistanceStrict(parseISO(schedule.start_time), parseISO(schedule.end_time)),
			price: `${(schedule.price as number) / 100} ₽`,
			id: schedule.id as number,
			address: schedule.address.length > 0 ? addressString(schedule.address[0]) : '',
		};

		return scheduleObject;
	};

	let fields: { [x: string]: string } = {
		date: 'Дата',
		time: 'Время',
		duration: 'Длительность',
		price: 'Стоимость',
	};

	if (schedule && schedule.status.length === 1 && schedule?.status.indexOf('OF') !== -1)
		fields = { ...fields, address: 'Адрес' };

	if (schedule && schedule.status.length > 1 && mode === 'OF')
		fields = { ...fields, address: 'Адрес' };

	const assign = () => {
		if (!schedule) return;

		if (user?.is_coach && client && schedule) {
			const data = {
				address: schedule.address[0]?.id,
				start_time: schedule.start_time,
				duration: differenceInMinutes(parseISO(schedule.end_time), parseISO(schedule.start_time)),
				user: client.user.id,
				consultation_type: schedule.status.length > 1 ? mode : schedule.status[0],
				note: '123',
			};
			onAssign(data, client, schedule, mode, close);
		}

		if (user?.is_client && specialist) {
			buySchedule(schedule, coachMode, specialist);
		}
	};

	const changeMode = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
		setMode(value as ModeCode);
	};
	return {
		schedule: normalizeSchedule(schedule),
		client,
		specialist,
		fields,
		assign,
		selectedMode: mode,
		changeMode,
	};
};

export default useSchedule;
