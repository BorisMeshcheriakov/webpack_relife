import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ProgramEditorValues } from 'library/types/programs';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const CoachPrice: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ProgramEditorValues>();

	return (
		<TextField
			{...register('cost_coach')}
			size="small"
			InputProps={{
				endAdornment: <InputAdornment position="end">₽</InputAdornment>,
			}}
			// label="Стоимость для специалиста"
			InputLabelProps={{ shrink: true }}
			error={!!errors?.cost_coach}
			type="number"
		/>
	);
};

export default CoachPrice;
