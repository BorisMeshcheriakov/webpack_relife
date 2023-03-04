import React from 'react';
import { ModalCopy } from 'library/components/schedules';
import { Consultation } from 'library/models/schedules';
import { parseISO, format } from 'date-fns';

type Props = {
	close: () => void;
	consultation: Consultation;
};

const ModalSuggest: React.FC<Props> = ({ close, consultation }) => {
	const message = `Предлагаю Вам перенести консультацию, назначенную на ${format(
		parseISO(consultation.start_time),
		'dd.MM.yyyy'
	)} \n Ссылка на перенос консультации: 👉 ${window.location.origin}/consultations/${
		consultation.id
	}`;
	return (
		<ModalCopy close={close} title="Оповещение" text={message}>
			<p>
				Предлагаю Вам перенести консультацию, назначенную на{' '}
				{format(parseISO(consultation.start_time), 'dd.MM.yyyy')}
			</p>
			<p>Ссылка на перенос консультации:</p>
			<a
				href={`${window.location.origin}/consultations/${consultation.id}`}
				target="_blank"
				rel="noreferrer"
				style={{ color: '#4198c5' }}
			>{`👉 ${window.location.origin}/consultations/${consultation.id}`}</a>
		</ModalCopy>
	);
};

export default ModalSuggest;
