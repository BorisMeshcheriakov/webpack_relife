import React from 'react';
import SVG from 'react-inlinesvg';

import plus from './resources/plus.svg';

import st from './ButtonAddVisitor.module.scss';

type Props = any;

const ButtonAddVisitor: React.FC<Props> = (props) => {
	return (
		<button className={st.button} {...props}>
			<span className={st.text}>Добавить</span>
			<div className={st.wrapper}>
				<SVG src={plus} className={st.icon} />
			</div>
		</button>
	);
};

export default ButtonAddVisitor;
