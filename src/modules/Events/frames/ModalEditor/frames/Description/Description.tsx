import { FC } from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Card } from 'library/components/ui';
import { fieldToUppercase } from 'library/helpers/events';

const Description: FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<fieldset>
			<h3>Описание</h3>
			<Card>
				<TextField
					variant="outlined"
					multiline
					fullWidth
					rows={3}
					error={!!errors?.description}
					helperText={errors.description?.message ?? ' '}
					InputLabelProps={{ shrink: true }}
					label="Описание"
					autoComplete="new-password"
					{...register(`description`, {
						onChange: (e) => (e.target.value = fieldToUppercase(e)),
					})}
				/>
			</Card>
		</fieldset>
	);
};

export default Description;
