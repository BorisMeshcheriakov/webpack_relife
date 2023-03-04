import React from 'react';

import { IconButtonGrey } from 'library/components/programs';
import { Close } from '@mui/icons-material';

import st from './styles.module.scss';

type Props = {
	title: string;
	onClose: () => void;
};

const Head: React.FC<Props> = ({ title, onClose }) => {
	return (
		<section className={st.header}>
			<h2>{title}</h2>
			<button className={st.header__submit} type="submit">
				Готово
			</button>
			<div className={st.header__close}>
				<IconButtonGrey type="button" onClick={onClose}>
					<Close fontSize="small" />
				</IconButtonGrey>
			</div>
		</section>
	);
};

export default Head;
