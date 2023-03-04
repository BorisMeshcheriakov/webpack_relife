import React from 'react';
import { Controller } from 'react-hook-form';
import cn from 'classnames';
import { Box, InputLabel, FormHelperText } from '@mui/material';

import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import 'react-phone-input-2/lib/material.css';

import st from './PhoneControlled.module.scss';

type Props = {
	name: any;
	control: any;
	[x: string]: any;
};

const PhoneControlled: React.FC<Props> = ({ control, name = ' ', ...props }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ref }, fieldState: { invalid, error } }) => (
				<Box sx={{ position: 'relative', height: '40px' }}>
					<InputLabel
						error={invalid}
						sx={{
							position: 'absolute',
							zIndex: 1,
							fontSize: '12px',
							top: '-8px',
							left: '10px',
							backgroundColor: '#fff',
							padding: '0 3px',
						}}
					>
						Телефон
					</InputLabel>
					<PhoneInput
						country={'ru'}
						value={value}
						onChange={onChange}
						localization={ru}
						inputClass={cn(st.input, error && st.error)}
						specialLabel=""
						containerClass={st.container}
						inputProps={{
							ref: ref,
							...props,
						}}
					/>
					<FormHelperText
						error={invalid}
						sx={{
							position: 'absolute',
							bottom: '0',
							left: '0',
							transform: 'translateY(150%)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '310px',
							// whiteSpace: "nowrap",
							// overflow: "hidden",
							// textOverflow: "ellipsis "
						}}
					>
						{error?.message ?? ' '}
					</FormHelperText>
				</Box>
			)}
		/>
	);
};

export default PhoneControlled;
