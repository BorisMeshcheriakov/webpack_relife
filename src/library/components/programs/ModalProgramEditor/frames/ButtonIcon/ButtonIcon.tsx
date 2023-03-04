import React from 'react';
import SVG from 'react-inlinesvg';

import st from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	icon: string;
}

const ButtonIcon: React.FC<Props> = ({ text, icon, ...props }) => {
	return (
		<button {...props} className={st.btn}>
			<span className={st.btn__text}>{text}</span>
			<div className={st.btn__icon}>{!!icon && <SVG src={icon} />}</div>
		</button>
	);
};

export default ButtonIcon;
