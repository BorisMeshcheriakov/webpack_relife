import { FC, memo } from 'react';
import { FormHelperText, IconButton, TextField } from '@mui/material';
import { PhoneControlled } from 'library/components/authentication/InputsControlled';
import { onChangeValidator } from 'library/helpers/events';
import { useFormContext, Controller } from 'react-hook-form';

import st from './Address.module.scss';
import { Close } from '@mui/icons-material';

interface Props {
	isDisabled: boolean;
	handler: () => void;
}

const Address: FC<Props> = ({ isDisabled, handler }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	return (
		<fieldset className={st.address} disabled={isDisabled}>
			<div className={st.wrapper}>
				<div className={st.wrapper__left}>
					<Controller
						control={control}
						name={`address.city`}
						render={({ field: { onChange, value, onBlur } }) => (
							<TextField
								label="Город"
								type="text"
								size="small"
								InputLabelProps={{ shrink: true }}
								value={value}
								onBlur={onBlur}
								onChange={(event) => {
									onChangeValidator(event, value, onChange);
								}}
								error={!!errors.address?.city}
								helperText={errors.address?.city?.message ?? ' '}
								sx={{ minWidth: '250px' }}
							/>
						)}
					/>
					<Controller
						control={control}
						name={`address.street`}
						render={({ field: { onChange, value, onBlur } }) => (
							<TextField
								label="Улица/Проспект/Переулок"
								type="text"
								size="small"
								InputLabelProps={{ shrink: true }}
								value={value}
								onBlur={onBlur}
								onChange={(event) => {
									onChangeValidator(event, value, onChange);
								}}
								error={!!errors.address?.street}
								helperText={errors?.address?.street?.message ?? ' '}
							/>
						)}
					/>
					<div className={st.wrapper__left_nums}>
						<Controller
							control={control}
							name={`address.house`}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextField
									label="Дом"
									type="text"
									size="small"
									InputLabelProps={{ shrink: true }}
									value={value}
									onBlur={onBlur}
									onChange={(event) => {
										onChangeValidator(event, value, onChange);
									}}
									error={!!errors.address?.house}
									helperText={errors.address?.house?.message ?? ' '}
								/>
							)}
						/>
						<Controller
							control={control}
							name={`address.apartment`}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextField
									label="Кв./Офис"
									type="text"
									size="small"
									InputLabelProps={{ shrink: true }}
									value={value}
									onBlur={onBlur}
									onChange={(event) => {
										onChangeValidator(event, value, onChange);
									}}
									error={!!errors.address?.apartment}
									helperText={errors.address?.apartment?.message ?? ' '}
								/>
							)}
						/>
					</div>
				</div>
				<div className={st.wrapper__right}>
					<div className={st.phone}>
						<PhoneControlled
							control={control}
							label="Телефон"
							error={!!errors.address?.phone}
							name="address.phone"
						/>
						<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.address?.phone}>
							{errors.address?.phone?.message ?? ' '}
						</FormHelperText>
					</div>
					<Controller
						name="address.note"
						control={control}
						render={({ field: { onChange, value, onBlur } }) => (
							<TextField
								label="Комментарий для клиента"
								value={value}
								onBlur={onBlur}
								onChange={(event) => {
									onChangeValidator(event, value, onChange);
								}}
								multiline
								rows={3.5}
								fullWidth
								className={st.textarea}
								InputLabelProps={{ shrink: true }}
							/>
						)}
					/>
				</div>
				<IconButton className={st.close} type="button" disabled={isDisabled} onClick={handler}>
					<Close />
				</IconButton>
			</div>
		</fieldset>
	);
};

export default memo(Address);
