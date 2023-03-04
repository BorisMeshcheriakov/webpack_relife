import React from 'react';
import cn from 'classnames';

import st from './InputText.module.scss';

type Props = {
	id: string;
	label?: string;
	register: any;
	error?: any;
	autoComplete?: any;
};

const InputText: React.FC<Props> = (props) => {
	return (
		<label htmlFor={props.id} className={cn(st.label, props.error?.message && st.errorLabel)}>
			<span className={st.title}>{props.label}</span>
			<input
				type="text"
				id={props.id}
				className={st.input}
				{...props.register}
				autoComplete={props.autoComplete}
			/>
			<span className={st.error}>{props.error?.message}</span>
		</label>
	);
};

export default InputText;
