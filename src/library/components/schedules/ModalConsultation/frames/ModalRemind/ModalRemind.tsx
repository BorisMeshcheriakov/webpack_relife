import React from 'react';
import { ModalCopy } from 'library/components/schedules';

type Props = {
	close: () => void;
	id: number;
};

const ModalRemind: React.FC<Props> = ({ close, id }) => {
	const message = `Для подтверждения консультации, Вам необходимо оплатить \n Ссылка на консультацию: 👉 ${window.location.origin}/consultations/${id}`;

	return (
		<ModalCopy close={close} title="Оповещение" text={message}>
			<p>Для подтверждения консультации, Вам необходимо оплатить</p>
			<p>Ссылка на консультацию:</p>
			<a
				href={`${window.location.origin}/consultations/${id}`}
				target="_blank"
				rel="noreferrer"
				style={{ color: '#4198c5' }}
			>{`👉 ${window.location.origin}/consultations/${id}`}</a>
		</ModalCopy>
	);
};

export default ModalRemind;
