import React from 'react';
import { Control, Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';

import st from './PasscodeControlled.module.scss';

interface Props {
	control: Control;
	disabled?: boolean;
	error: boolean;
	length?: number;
}

const PasscodeControlled: React.FC<Props> = ({ control, error, length, disabled }) => {
	return (
		<Controller
			name="passcode"
			render={({ field: { onChange, value } }) => {
				return (
					<OtpInput
						value={value}
						onChange={onChange}
						hasErrored={error}
						isDisabled={disabled}
						numInputs={length || 4}
						isInputNum={true}
						shouldAutoFocus={false}
						containerStyle={st.passcode}
						inputStyle={st.passcode__input}
						errorStyle={st.passcode__input_error}
						focusStyle={!error && st.passcode__input_focus}
					/>
				);
			}}
			control={control}
		/>
	);
};

export default PasscodeControlled;
