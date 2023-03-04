import { Calendar } from 'library/types/schedules';
import { useModuleSettings } from '../module';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { OriginSchedule } from 'library/models/schedules';

const useClick = (
	start: Date,
	end: Date,
	calendar: Calendar,
	consultation: any,
	busy?: OriginSchedule
) => {
	const { url } = useRouteMatch();
	const { push } = useHistory();

	const { locationRoot } = useModuleSettings();

	const onClick = () => {
		if (calendar === 'editor' && !busy) {
			// onEditorClick(consultation, start);
		}

		if (locationRoot === 'schedules') {
			/**
			 * Проверить, есть ли в кликнутой ячейке консультация
			 *
			 * Если есть приобретенная консультация, открыть ее в модальном окне
			 */

			if (calendar === 'consultations' && busy) {
				push(`${url}/consultation/busy/${busy.consultation_id}`);
			}
		}

		if (locationRoot === 'clients') {
			/**
			 * Проверить, есть ли в кликнутой ячейке консультация
			 *
			 * Если есть приобретенная консультация, открыть ее в модальном окне
			 *
			 * Если есть открытая консультация, начать процедуру записи
			 */

			if (consultation && !busy) {
				push(`${url}/consultation/open/${consultation.id}`);
			} else if (busy) {
				push(`${url}/consultation/busy/${busy.consultation_id}`);
			}
		}
	};
	return {
		onClick,
	};
};

export default useClick;
