import { FC } from 'react';
import { FieldError } from 'react-hook-form';
import { PasscodeControlled, PasswordControlled, PhoneControlled } from '../InputsControlled';

import st from './CustomInput.module.scss';

interface Props {
	type: 'passcode' | 'password' | 'phonenumber';
	name: string;
	control: any;
	error: FieldError | undefined;
	disabled: boolean;
	label?: string | undefined;
	showPassword?: boolean | undefined;
	setValue?: () => void;
}

const CustomInput: FC<Props> = ({
	name,
	error,
	type,
	control,
	disabled,
	showPassword,
	label = '',
	setValue,
}) => {
	return (
		<>
			<div className={st.wrapper}>
				<div className={st.wrapper__input}>
					{type === 'passcode' && (
						<PasscodeControlled control={control} disabled={disabled} error={!!error?.message} />
					)}

					{type === 'phonenumber' && (
						<PhoneControlled
							name={name}
							control={control}
							disabled={disabled}
							error={!!error?.message}
							label={label}
						/>
					)}
					{type === 'password' && (
						<PasswordControlled
							name={name}
							control={control}
							disabled={disabled}
							error={!!error?.message}
							label={label}
							showPassword={showPassword}
							setValue={setValue}
						/>
					)}
				</div>
				<div className={st.wrapper__errorMessage}>{error && <p>{error?.message}</p>}</div>
			</div>
		</>
	);
};

export default CustomInput;
