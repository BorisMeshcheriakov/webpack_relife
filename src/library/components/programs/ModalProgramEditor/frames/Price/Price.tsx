import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ProgramEditorValues } from 'library/types/programs';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Price: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ProgramEditorValues>();

	return (
		<TextField
			{...register('cost')}
			size="small"
			InputProps={{
				endAdornment: <InputAdornment position="end">₽</InputAdornment>,
			}}
			// label="Стоимость для клиента"
			InputLabelProps={{ shrink: true }}
			error={!!errors?.cost}
			type="number"
		/>
	);
};

export default Price;
