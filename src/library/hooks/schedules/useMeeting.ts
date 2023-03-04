import { Consultation } from 'library/models/schedules';
import { useDialog } from '../common';
import { useUser } from '../user';

const useMeeting = () => {
	const { user } = useUser();
	const { notify } = useDialog();

	const connectMeeting = (consultation: Consultation | null) => {
		if (!consultation) return;

		if (!consultation.meeting) {
			return notify({
				title: 'Консультация не найдена',
				text: 'Не удалось найти консультацию. Пожалуйста обратитесь в техподдержку',
				confirmText: 'Ок',
			});
		}

		const { meeting } = consultation;
		let url = '';

		if (user?.is_coach) url = meeting.start_url;
		if (user?.is_client) url = meeting.join_url;

		window.open(url);
	};

	return {
		connectMeeting,
	};
};

export default useMeeting;
