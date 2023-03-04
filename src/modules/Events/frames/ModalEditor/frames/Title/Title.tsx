import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { fieldToUppercase } from 'library/helpers/events';
import { ImageInput } from 'library/components/events';
import { Card } from 'library/components/ui';

import st from './Title.module.scss';

const Title: FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<fieldset>
			<Card className={st.title}>
				<div className={st.wrapper}>
					<ImageInput fieldName="event_image" className={st.title__image} />
					<div className={st.title__text}>
						<TextField
							multiline
							fullWidth
							rows={3}
							className={st.textarea}
							error={!!errors?.title}
							helperText={errors.title?.message ?? ' '}
							InputLabelProps={{ shrink: true }}
							label="Название"
							{...register('title', {
								onChange: (e) => (e.target.value = fieldToUppercase(e)),
							})}
						/>
					</div>
				</div>
			</Card>
		</fieldset>
	);
};

export default Title;
