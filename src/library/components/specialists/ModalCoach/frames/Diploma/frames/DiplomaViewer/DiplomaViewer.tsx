import { Close } from '@mui/icons-material';
import React from 'react';
import Modal from 'react-modal';

import st from './DiplomaViewer.module.scss';

type Props = {
	url: string;
	close: () => void;
};

const DiplomaViewer: React.FC<Props> = ({ url, close }) => {
	return (
		<Modal isOpen className={st.viewer} overlayClassName={st.overlay} ariaHideApp={false}>
			<div className={st.wrapper}>
				<button className={st.wrapper__close} onClick={close}>
					<Close />
				</button>
				<img className={st.wrapper__image} src={url} alt="diploma" />
			</div>
		</Modal>
	);
};

export default DiplomaViewer;
