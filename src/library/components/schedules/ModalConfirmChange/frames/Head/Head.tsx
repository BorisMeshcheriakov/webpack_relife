import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import cn from 'classnames';

import st from './Head.module.scss';

type Props = {
	close: () => void;
	move: () => void;
};

const Head: React.FC<Props> = ({ close, move }) => {
	return (
		<div className={st.head}>
			<h2 className={st.head__title}>Перенос консультации</h2>
			<button className={cn(st.head__confirm, st.active)} onClick={move}>
				Подтвердить
			</button>
			<div className={st.head__close}>
				<IconButton sx={{ color: '#fff' }} onClick={close}>
					<Close />
				</IconButton>
			</div>
		</div>
	);
};

export default Head;
