import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormHelperText, TextField } from '@mui/material';
import { Card } from 'library/components/ui';
import { PhoneControlled } from 'library/components/authentication/InputsControlled';

import st from './Contacts.module.scss';

type Props = {};

const Contacts: FC<Props> = (props) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<fieldset>
				<h3>Контактная информация</h3>
				<Card className={st.contacts}>
					<div className={st.phone}>
						<PhoneControlled
							control={control}
							label="Телефон"
							error={!!errors.phone?.message}
							name="phone"
						/>
						<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.phone}>
							{errors.phone?.message ?? ' '}
						</FormHelperText>
					</div>
					<div className={st.email}>
						<TextField
							label="Email"
							InputLabelProps={{ shrink: true }}
							size="small"
							type="text"
							helperText=" "
							{...register('email', {
								onChange: (e) => {
									e.target.value = e.target.value.replace(/\s/g, '');
								},
							})}
							sx={{ minWidth: '208px', width: '100%' }}
						/>
					</div>
				</Card>
			</fieldset>
		</>
	);
};

export default Contacts;
