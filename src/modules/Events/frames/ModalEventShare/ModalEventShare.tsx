import React from 'react';
import { useAppSelector } from 'library/hooks/common';
import { useShare } from 'library/hooks/events';
import { Button } from 'library/components/common';
import { selectShareId } from 'library/redux/events';
import { ModalSuccess } from './frames';

import Modal from 'react-modal';

import st from './ModalEventShare.module.scss';

const ModalEventShare: React.FC = () => {
	const id = useAppSelector(selectShareId);
	const [isModalSuccess, setIsModalSuccess] = React.useState<boolean>(false);
	const { isOpen, closeShare } = useShare();

	const closeModal = () => {
		isOpen && closeShare();
	};

	const onClick = () => {
		navigator.clipboard.writeText(`${window.location.origin}/events/${id}`);
		setIsModalSuccess(true);
	};

	return (
		<Modal
			isOpen={true}
			className={st.shareModal}
			overlayClassName={st.shareModal__overlay}
			onRequestClose={closeModal}
			ariaHideApp={false}
		>
			<div className={st.shareModal__header}>
				<p>Поделиться мероприятием</p>
			</div>
			<div className={st.shareModal__body}>
				<p>Скопируйте и отправьте ссылку удобным для Вас способом.</p>
				<Button handler={onClick} className={st.copy}>
					Копировать ссылку
				</Button>
			</div>
			<ModalSuccess isOpen={isModalSuccess} closeModalSuccess={closeModal} timer={3000} />
		</Modal>
	);
};

export default ModalEventShare;
