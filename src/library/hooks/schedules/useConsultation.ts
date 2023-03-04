import { format, formatDistanceStrict, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Consultation } from 'library/models/schedules';
import { NormalizedConsultation } from 'library/types/schedules';
import { useLoadConsultation, useMeeting } from 'library/hooks/schedules';
import { addressString, consultationStatus, modes } from 'library/helpers/schedules';
import { useModulePermissions } from '../module';
import { useAppSelector } from '../common';
import { selectTimezone } from 'library/redux/schedules';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';

type Props = {
	id: string | number | null;
};

const useConsultation = ({ id }: Props) => {
	const { consultation } = useLoadConsultation({ id });
	const { can_sell } = useModulePermissions();
	const tz = useAppSelector((state) => selectTimezone(state, 'consultations'));

	const { connectMeeting } = useMeeting();

	const normalizeSchedule = (schedule: Consultation | null): NormalizedConsultation | null => {
		if (!schedule) return null;

		let scheduleObject = {
			mode: modes[schedule.type].editorTitle,
			status: consultationStatus(schedule),
			date: format(utcToZonedTime(parseISO(schedule.start_time), tz), 'dd MMMM yyyy', {
				locale: ru,
			}),
			time: formatInTimeZone(parseISO(schedule.start_time), tz, 'HH:mm (zzz)'),
			duration: formatDistanceStrict(parseISO(schedule.start_time), parseISO(schedule.end_time), {
				locale: ru,
			}),
			price: `${schedule.cost.amount / 100} ₽`,
			id: schedule.id,
			user: can_sell ? schedule.user : schedule.coach,
			address: consultation?.schedule.period.address
				? addressString(consultation?.schedule.period.address[0])
				: '',
		};

		return scheduleObject;
	};

	let fields: { [x: string]: string } = {
		date: 'Дата',
		time: 'Время',
		duration: 'Длительность',
		price: 'Стоимость',
		// full_price: 'Полная стоимость',
	};

	if (consultation && consultation.type === 'OF') fields = { ...fields, address: 'Адрес' };

	return {
		consultation: normalizeSchedule(consultation),
		schedule: consultation,
		fields,
		connectMeeting: () => connectMeeting(consultation),
	};
};

export default useConsultation;
