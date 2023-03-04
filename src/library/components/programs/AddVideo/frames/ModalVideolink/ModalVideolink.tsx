import React from 'react';
import Modal from 'react-modal';

import { OutlinedInput } from '@mui/material';

import st from './ModalVideolink.module.scss';
import { useForm } from 'react-hook-form';

type Props = {
	isOpen: boolean;
	close: () => void;
	videoSource: string;
	saveUrl: (url: string) => void;
};

const ModalVideolink: React.FC<Props> = ({ isOpen, close, videoSource, saveUrl }) => {
	const { register, handleSubmit } = useForm<{ url: string }>();

	const onSubmit = (data: { url: string }) => {
		saveUrl(data.url);
		close();
	};

	return (
		<Modal
			className={st.modal}
			overlayClassName={st.overlay}
			isOpen={isOpen}
			onRequestClose={close}
			ariaHideApp={false}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={st.modal__head}>
					<h3>{videoSource}</h3>
					<button type="button" onClick={handleSubmit(onSubmit)}>
						Готово
					</button>
				</div>
				<div className={st.modal__link}>
					<OutlinedInput
						{...register('url')}
						fullWidth
						placeholder={`Вставьте ссылку с ${videoSource}`}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default ModalVideolink;
