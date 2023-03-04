import React from 'react';
import st from './ButtonLink.module.scss';

interface Props {
	children: React.ReactNode | React.ReactChildren;
	disabled: boolean;
	handler?: () => void;
}

const ButtonLink: React.FC<Props> = ({ children, disabled, handler }) => {
	return (
		<div className={st.wrapper}>
			<button type="button" className={st.btn} disabled={disabled} onClick={handler}>
				{children}
			</button>
		</div>
	);
};

export default ButtonLink;
