import React from 'react';

import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import st from './Header.module.scss';

type Props = {
	id: string;
	handleClose: () => void;
};

const Header: React.FC<Props> = ({ id, handleClose }) => {
	return (
		<section className={st.header}>
			<h2>{id === 'new' ? 'Новое видео' : 'Редактирование видео'}</h2>
			<button className={st.header__submit} type="submit">
				Готово
			</button>
			<div className={st.header__close}>
				<IconButton type="button" onClick={handleClose}>
					<Close />
				</IconButton>
			</div>
		</section>
	);
};

export default Header;
