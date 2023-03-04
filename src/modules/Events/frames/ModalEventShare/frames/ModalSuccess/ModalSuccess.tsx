import { FC } from 'react';

import st from './ModalSuccess.module.scss';

interface Props {
	isOpen: boolean;
	timer?: number;
	closeModalSuccess: () => void;
}

const ModalSuccess: FC<Props> = ({ isOpen, closeModalSuccess, timer = 1000 }) => {
	if (isOpen) {
		setTimeout(closeModalSuccess, timer);
		return <div className={st.copy}>Скопировано в буфер обмена</div>;
	}
	return null;
};

export default ModalSuccess;
