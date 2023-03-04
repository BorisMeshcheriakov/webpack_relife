import React from 'react';
import { ModalCopy } from 'library/components/schedules';
import { Consultation } from 'library/models/schedules';
import { useChangeTime } from 'library/hooks/schedules';

type Props = {
	close: () => void;
	consultation: Consultation;
};

const ModalRemindMove: React.FC<Props> = ({ close, consultation }) => {
	const { oldTime, newTime } = useChangeTime({
		requestId: consultation.schedule.changing_time_process.schedule!,
	});
	const message = `Консультация, назначенная на ${oldTime} \nБыла перенесена на ${newTime} \nСсылка на подтверждение: \n👉 ${window.location.origin}/consultations/${consultation?.id}`;

	return (
		<ModalCopy close={close} title="Оповещение" text={message}>
			<>
				<p>Консультация, назначенная на {oldTime}</p>
				<p>Была перенесена на {newTime}</p>
				<p>Ссылка на подтверждение:</p>
				<a
					href={`${window.location.origin}/consultations/${consultation.id}`}
					target="_blank"
					rel="noreferrer"
					style={{ color: '#4198c5' }}
				>{`👉 ${window.location.origin}/consultations/${consultation.id}`}</a>
			</>
		</ModalCopy>
	);
};

export default ModalRemindMove;
