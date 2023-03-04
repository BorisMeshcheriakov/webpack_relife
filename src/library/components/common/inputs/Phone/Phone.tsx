import { forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import cn from 'classnames';

import st from './Phone.module.scss';
import 'react-phone-number-input/style.css';

interface Props {
	value: string | undefined;
	onChange: (...event: any[]) => void;
	disabled?: boolean;
	error?: any;
	label?: string;
	name: string;
}

const Phone = forwardRef(({ value, onChange, disabled, error, label, name }: Props, ref: any) => {
	return (
		<div className={cn(st.login__input, error && st.error, disabled && st.disabled)}>
			<label className={st.login__label} htmlFor={name}>
				{label}
			</label>
			<PhoneInput
				country="RU"
				international
				name={name}
				value={value}
				onChange={onChange}
				ref={ref}
				withCountryCallingCode
				className={st.input}
				disabled={disabled}
			/>
		</div>
	);
});

export default Phone;
