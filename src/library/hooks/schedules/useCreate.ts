import { addMinutes, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { timeFormat } from 'library/helpers/schedules';
import {
	createConsultation,
	selectAddress,
	selectMode,
	selectTimezone,
} from 'library/redux/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';
import { useAppDispatch, useAppSelector, useDialog } from '../common';

const useCreate = () => {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(selectConsultationSettings);
	const mode = useAppSelector(selectMode);
	const address = useAppSelector(selectAddress);
	const tz = useAppSelector((state) => selectTimezone(state, 'editor'));
	const { dialog } = useDialog();

	const create = (start: Date) => {
		if (!settings) return;

		let consultation = {
			start_time: format(zonedTimeToUtc(start, tz), timeFormat),
			end_time: format(
				addMinutes(zonedTimeToUtc(start, tz), settings[mode].duration * 30),
				timeFormat
			),
			status: [mode],
			address: [] as number[],
		};

		if (mode === 'OF' && address) {
			consultation = { ...consultation, address: [address.id] };
		}

		dispatch(createConsultation(consultation));
	};

	const onCreate = (start: Date) => {
		if (start.valueOf() < new Date().valueOf()) {
			return dialog({
				title: 'Ошибка',
				text: 'Выбранное время уже прошло. Вы действительно хотите создать консультацию?',
				confirmText: 'Создать',
				confirm: () => create(start),
				declineText: 'Не создавать',
			});
		}

		return create(start);
	};

	return {
		onCreate,
	};
};

export default useCreate;
