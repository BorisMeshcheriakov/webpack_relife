import React, { ReactNode } from 'react';
import st from './AuthFrom.module.scss';

interface Props {
	children: ReactNode;
	onSubmit: () => void;
	autoComplete?: string;
}

const AuthFrom: React.FC<Props> = ({ children, onSubmit, autoComplete }) => {
	return (
		<>
			<form className={st.form} onSubmit={onSubmit} autoComplete={autoComplete}>
				{children}
			</form>
		</>
	);
};

export default AuthFrom;
