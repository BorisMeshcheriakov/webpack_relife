import React from 'react';
import { Controller } from 'react-hook-form';

import { ClientList } from 'library/models/clients';

import { FormControlLabel, Radio, RadioGroup, TextField, Button } from '@mui/material';
import { ModalMiddle } from 'library/components/common';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import ruLocale from 'date-fns/locale/ru';

import { ImageUpload } from './frames';

import { useClientForm } from 'library/hooks/clients';
import { useAppDispatch } from 'library/hooks/common';
import { changeClients } from 'library/redux/clients';

import st from './ModalCreate.module.scss';

interface Props {
	onClose: () => void;
	client?: ClientList | null;
	onSuccess?: (data: ClientList) => void;
}

const ModalCreate: React.FC<Props> = ({ onClose, client, onSuccess }) => {
	const dispatch = useAppDispatch();
	const onSubmit = (data: ClientList) => {
		onSuccess && onSuccess(data);
		dispatch(
			changeClients({
				list: [],
				page: 1,
				hasNext: true,
				status: 'idle',
			})
		);
		onClose();
	};

	const { register, submit, handleSubmit, control, errors } = useClientForm({
		client: client,
		onSuccess: onSubmit,
	});

	const onModalClose = () => onClose();

	return (
		<ModalMiddle isOpen close={onModalClose} onRequestClose={onModalClose}>
			<form className={st.form} onSubmit={handleSubmit(submit)}>
				<section className={st.header}>
					<h3>{`${client ? 'Редактирование' : 'Создание'} клиента`}</h3>
					<Button type="submit" sx={{ position: 'absolute', right: 30 }}>
						{`Готово`}
					</Button>
				</section>
				<section className={st.body}>
					<Controller
						name="photo"
						control={control}
						render={({ field: { onChange, value } }) => (
							<ImageUpload onChange={onChange} value={value} error={!!errors.photo} />
						)}
					/>
					<TextField
						{...register('last_name')}
						label={'Фамилия'}
						InputLabelProps={{ shrink: true }}
						fullWidth
						margin="dense"
						size="small"
						error={!!errors['last_name']}
						helperText={errors['last_name']?.['message']}
					/>
					<TextField
						{...register('first_name')}
						label={'Имя'}
						InputLabelProps={{ shrink: true }}
						fullWidth
						margin="dense"
						size="small"
						error={!!errors['first_name']}
						helperText={errors['first_name']?.['message']}
					/>
					<TextField
						{...register('middle_name')}
						label={'Отчество'}
						InputLabelProps={{ shrink: true }}
						fullWidth
						margin="dense"
						size="small"
						error={!!errors['middle_name']}
						helperText={errors['middle_name']?.['message']}
					/>
					<div className={st.row}>
						<Controller
							control={control}
							name="birth_date"
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
									<DesktopDatePicker
										label="Дата рождения"
										value={value}
										onChange={onChange}
										mask="__-__-____"
										inputFormat="dd-MM-yyyy"
										renderInput={(params) => (
											<TextField
												InputLabelProps={{ shrink: true }}
												size="small"
												margin="dense"
												error={!!error}
												helperText={error?.message}
												{...params}
												inputProps={{
													...params.inputProps,
													placeholder: 'дд-мм-гггг',
												}}
											/>
										)}
									/>
								</LocalizationProvider>
							)}
						/>

						<Controller
							control={control}
							name="gender"
							render={({ field: { value, onChange } }) => (
								<RadioGroup value={value} onChange={onChange} row>
									<FormControlLabel value="f" control={<Radio size="small" />} label="Женский" />
									<FormControlLabel value="m" control={<Radio size="small" />} label="Мужской" />
								</RadioGroup>
							)}
						/>
					</div>
					<TextField
						{...register('phone')}
						label={'Номер телефона'}
						InputLabelProps={{ shrink: true }}
						fullWidth
						disabled={!!client}
						margin="dense"
						size="small"
						error={!!errors['phone']}
						helperText={errors['phone']?.['message']}
					/>
					<TextField
						{...register('email')}
						InputLabelProps={{ shrink: true }}
						label={'Почта'}
						fullWidth
						margin="dense"
						size="small"
						error={!!errors['email']}
						helperText={errors['email']?.['message']}
					/>
				</section>
			</form>
		</ModalMiddle>
	);
};

export default ModalCreate;
