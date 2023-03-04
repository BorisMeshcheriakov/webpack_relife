import React from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import cross from './resources/cross.svg';

import st from './ButtonCross.module.scss';

interface Props {
	handler?: () => void;
	theme: string;
	disabled?: boolean;
}

const ButtonCross: React.FC<Props> = ({ handler, theme, disabled }) => {
	const getStyle = (theme: string) => {
		switch (theme) {
			case 'grey':
				return st.grey;
			case 'white':
				return st.white;
			default:
				return st.grey;
		}
	};

	return (
		<button
			disabled={disabled}
			className={cn(st.button, getStyle(theme))}
			onClick={handler}
			autoFocus={true}
		>
			<SVG className={st.icon} src={cross} />
		</button>
	);
};

export default ButtonCross;
