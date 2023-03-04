import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { CustomEditorInputControlled } from 'library/components/authentication/InputsControlled';
import { numberMask } from 'library/helpers/events/timePicker';
import { Card } from 'library/components/ui';
import { useParams } from 'react-router-dom';

import st from './Cost.module.scss';

type Props = {};

const Cost: FC = (props: Props) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { id } = useParams<{ id: string }>();

	return (
		<fieldset>
			<h3>Стоимость мероприятия</h3>
			<Card className={st.cost}>
        <div className={st.wrapper}>
				<Box sx={{ width: 231 }}>
					<CustomEditorInputControlled
						control={control}
						name="cost"
						error={!!errors.cost ?? false}
						label="Цена"
						sufix={'₽'}
						mask={numberMask}
						disabled={!!id}
					/>
					<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.cost}>
						{errors.cost?.message ?? ' '}
					</FormHelperText>
				</Box>

				<Box sx={{ width: 231 }}>
					<CustomEditorInputControlled
						control={control}
						name="places"
						error={!!errors.places ?? false}
						label="Количество мест"
						mask={numberMask}
					/>
					<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.places}>
						{errors.places?.message ?? ' '}
					</FormHelperText>
				</Box>
        </div>
			</Card>
		</fieldset>
	);
};

export default Cost;
