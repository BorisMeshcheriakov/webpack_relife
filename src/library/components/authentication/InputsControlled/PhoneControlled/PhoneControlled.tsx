import { FC } from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import cn from 'classnames';
import st from './PhoneControlled.module.scss';
import ru from 'react-phone-input-2/lang/ru.json';

interface Props {
	control: any;
	name: string;
	disabled?: boolean;
	error: boolean;
	label: string | undefined;
}

const PhoneControlled: FC<Props> = ({ control, label, error, name }) => {
	return (
		<Controller
			name={name}
			render={({ field: { onChange, value, onBlur } }) => {
				return (
					<div className={cn(st.controller, error && st.error)}>
						<label className={cn(st.label, error && st.error)} htmlFor={name}>
							<p>{label}</p>
						</label>
						<PhoneInput
							placeholder="+7 (000) 000-00-00"
							country={'ru'}
							value={value}
							onBlur={onBlur}
							onChange={onChange}
							localization={ru}
							inputClass={cn(st.input, error && st.error)}
							specialLabel=""
							containerClass={st.wrapper}
						/>
					</div>
				);
			}}
			rules={{
				required: 'Это поле обязательно',
				minLength: { value: 7, message: 'Номер слишком короткий' },
			}}
			control={control}
		/>
	);
};

export default PhoneControlled;
