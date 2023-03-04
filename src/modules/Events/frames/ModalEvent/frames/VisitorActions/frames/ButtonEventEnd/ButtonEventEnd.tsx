import { FC } from 'react';
import { icons } from './index';

import SVG from 'react-inlinesvg';

import st from './ButtonEventEnd.module.scss';

const ButtonEventEnd: FC = () => {
	return (
		<div className={st.wrapper}>
			<SVG src={icons.end} className={st.svg} />
			<p className={st.title}>Мероприятие завершено</p>
		</div>
	);
};

export default ButtonEventEnd;
