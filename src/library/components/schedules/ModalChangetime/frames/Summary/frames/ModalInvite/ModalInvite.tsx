import React from 'react';
import { ModalCopy } from 'library/components/schedules';
import { CoachAvailablePeriods, Consultation } from 'library/models/schedules';
import { parseISO, format } from 'date-fns';

type Props = {
	close: () => void;
	consultation: Consultation;
	schedule: CoachAvailablePeriods;
};

const ModalInvite: React.FC<Props> = ({ close, consultation, schedule }) => {
	const formatDate = (date: string) => format(parseISO(date), 'dd.MM.yyyy HH:mm');
	const message = `Консультация, назначенная на ${formatDate(
		consultation.start_time
	)}\nБыла перенесена на ${formatDate(schedule.start_time)}\n\n	Ссылка на подтверждение: 👉 ${
		window.location.origin
	}/consultations/${consultation.id}`;

	return (
		<ModalCopy close={close} title="Оповещение" text={message}>
			<p>Консультация, назначенная на {formatDate(consultation.start_time)}</p>
			<p>Была перенесена на {formatDate(schedule.start_time)}</p>
			<br />
			<p>Ссылка на подтверждение:</p>
			<a
				href={`${window.location.origin}/consultations/${consultation.id}`}
				target="_blank"
				rel="noreferrer"
				style={{ color: '#4198c5' }}
			>{`👉 ${window.location.origin}/consultations/${consultation.id}`}</a>
		</ModalCopy>
	);
};

export default ModalInvite;
