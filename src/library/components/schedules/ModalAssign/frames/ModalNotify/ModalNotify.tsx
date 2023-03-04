import React from 'react';

import { ModalCopy } from 'library/components/schedules';
import { useParams } from 'react-router-dom';

type Props = {
	close: () => void;
};

const ModalNotify: React.FC<Props> = ({ close }) => {
	const { id } = useParams<{ [x: string]: string }>();
	const message = `Для подтверждения консультации, Вам необходимо оплатить \n Ссылка на консультацию: 👉 ${window.location.origin}/consultations/${id}`;
	return (
		<ModalCopy title="Оповещение" close={close} text={message} onAfterCopy={close}>
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

export default ModalNotify;
