import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import cn from 'classnames';

import st from './Head.module.scss';

type Props = {
	step: number;
	close: () => void;
	move: () => void;
};

const Head: React.FC<Props> = ({ step, close, move }) => {
	return (
		<div className={st.head}>
			<h2 className={st.head__title}>Перенос консультации</h2>
			<button className={cn(st.head__confirm, step === 1 && st.active)} onClick={move}>
				Готово
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
