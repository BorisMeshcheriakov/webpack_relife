import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ProgramEditorValues } from 'library/types/programs';

import { TextField } from '@mui/material';

import st from './Description.module.scss';

const Description: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ProgramEditorValues>();

	return (
		<>
			<div className={st.areaWrapper}>
				<TextField
					{...register('description')}
					size="small"
					fullWidth
					multiline
					rows={4}
					variant="standard"
					error={!!errors?.description}
					InputProps={{
						disableUnderline: true,
					}}
					sx={{ overflow: 'auto' }}
				/>
			</div>
		</>
	);
};

export default Description;
