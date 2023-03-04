import { canUpdateStatus } from 'library/helpers/schedules';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { selectMode } from 'library/redux/schedules';
import { useAppSelector, useDialog } from '../common';
import { useCreate, useRemove, useUpdate } from 'library/hooks/schedules';
import { selectConsultationSettings } from 'library/redux/users/selectors';

const useEditor = () => {
	const { onCreate } = useCreate();
	const { update } = useUpdate();
	const { remove } = useRemove();
	const mode = useAppSelector(selectMode);
	const settings = useAppSelector(selectConsultationSettings);

	const { notify } = useDialog();

	const onClick = (
		start: Date,
		end: Date,
		consultation: CoachAvailablePeriods,
		busy?: OriginSchedule
	) => {
		if (busy) return;

		if (!settings![mode].cost || !settings![mode].duration) {
			return notify({
				title: 'Настройки не заполнены',
				text: 'Необходимо заполнить настройки консультации - продолжительность и стоимость',
				confirmText: 'Ок',
			});
		}

		if (consultation && settings) {
			if (
				settings['ON'].duration === settings['OF'].duration &&
				canUpdateStatus(consultation, mode)
			) {
				update(consultation);
			} else {
				remove(consultation);
			}
		} else {
			onCreate(start);
		}
	};
	return {
		onClick,
	};
};

export default useEditor;
