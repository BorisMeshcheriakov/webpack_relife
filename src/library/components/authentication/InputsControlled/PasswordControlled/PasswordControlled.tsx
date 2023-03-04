import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { IconButton } from '@mui/material';

import cn from 'classnames';
import st from './PasswordControlled.module.scss';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface Props {
	name: string;
	control: Control<any>;
	disabled?: boolean;
	error: boolean;
	label: string;
	setValue?: () => void;
	showPassword?: boolean | undefined;
}

const PasswordControlled: React.FC<Props> = ({
	name,
	control,
	label,
	error,
	showPassword,
	disabled,
	setValue,
}) => {
	return (
		<Controller
			name={name}
			render={({ field: { onChange, value = '', name } }) => {
				return (
					<div className={cn(st.controller, error && st.error)}>
						<label className={cn(st.label, error && st.error)} htmlFor={name}>
							<p>{label}</p>
						</label>
						<div className={cn(st.wrapper__input, error && st.error)}>
							<input
								type={showPassword ? 'text' : 'password'}
								value={value}
								onChange={onChange}
								disabled={disabled}
								className={st.input}
							/>
							<IconButton
								aria-label="toggle password visibility"
								onClick={setValue}
								onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
								edge="end"
								size="small"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</div>
					</div>
				);
			}}
			control={control}
		/>
	);
};

export default PasswordControlled;
