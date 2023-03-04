import React from 'react';

import st from './Button.module.scss';

type Props = {
	children: React.ReactNode;
	[x: string]: any;
};

const Button: React.FC<Props> = ({ children, ...props }) => {
	return (
		<button {...props} className={st.button}>
			{children}
		</button>
	);
};

export default Button;
