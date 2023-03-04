import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { ProgramEditorValues } from 'library/types/programs';

import TextField from '@mui/material/TextField';
import { ImageInput } from 'library/components/programs';

import { fieldToUppercase } from 'library/helpers/events';

import st from './Title.module.scss';

const Title: React.FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<ProgramEditorValues>();

	return (
		<div className={st.title}>
			<Controller
				control={control}
				name="promo_image"
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<ImageInput value={value} onChange={onChange} error={error} className={st.title__image} />
				)}
			/>

			<div className={st.title__right}>
				<div className={st.title__text}>
					<TextField
						{...register('title', {
							onChange: (e) => (e.target.value = fieldToUppercase(e)),
						})}
						size="small"
						multiline
						fullWidth
						rows={4}
						variant="standard"
						error={!!errors?.title}
						InputProps={{
							disableUnderline: true,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Title;
