import React from 'react';
import cn from 'classnames';

import st from './ButtonTransparent.module.scss';

const ButtonTransparent = ({ handler, theme, text }) => {
	const getTheme = () => {
		switch (theme) {
			case 'grey':
				return st.grey;
			case 'blue':
				return st.blue;
			default:
				break;
		}
	};

	return (
		<button className={cn(st.button, getTheme())} onClick={handler}>
			{text}
		</button>
	);
};

export default ButtonTransparent;
