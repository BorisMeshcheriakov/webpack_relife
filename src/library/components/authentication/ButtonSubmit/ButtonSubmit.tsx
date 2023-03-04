import React, { ReactNode } from 'react';

import st from './ButtonSubmit.module.scss';

interface Props {
	type?: 'submit' | 'reset' | undefined;
	disabled?: boolean;
	children: ReactNode;
	handler?: () => void;
}

const ButtonSubmit: React.FC<Props> = ({ disabled, children, type, handler }) => {
	return (
		<button type={type} disabled={disabled} className={st.submit} onClick={handler}>
			{children}
		</button>
	);
};

export default ButtonSubmit;
