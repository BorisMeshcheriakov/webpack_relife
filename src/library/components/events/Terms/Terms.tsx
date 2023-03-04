import { FormHelperText } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import st from './Terms.module.scss';

type Props = {
	acceptTerms?: any;
	setAcceptTerms?: any;
	error?: any;
};

const Terms: React.FC<Props> = ({ acceptTerms, setAcceptTerms, error }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className={st.terms}>
			<label
				htmlFor={'offer_accepted'}
				className={st.label + ' ' + (error && !acceptTerms && st.label_error)}
			>
				<input
					id="offer_accepted"
					type="checkbox"
					checked={acceptTerms}
					className={st.checkbox}
					{...register('offer_accepted')}
				/>
				<span className={st.text}>
					Нажимая на кнопку "Оплатить", Вы соглашаетесь с <a href="*">договором-офертой</a>
				</span>
			</label>
			<FormHelperText error={!!errors?.offer_accepted}>
				{errors?.offer_accepted?.message}
			</FormHelperText>
			<span className={st.note}>
				Билет в формате PDF будет отправлен на указанный вами адрес электронной почты.
			</span>
		</div>
	);
};

export default Terms;
