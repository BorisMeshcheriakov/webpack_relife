import { FC } from 'react';
import { useCountries } from 'library/hooks/events';
import { useFormContext, Controller } from 'react-hook-form';
import {
	FormControl,
	TextField,
	OutlinedInput,
	Select,
	MenuItem,
	InputLabel,
	FormHelperText,
} from '@mui/material';
import { onChangeValidator } from 'library/helpers/events';

import { Card } from 'library/components/ui';

import st from './Address.module.scss';

type Props = {};

const Address: FC<Props> = (props: Props) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const { countries, status } = useCountries();

	return (
		<fieldset>
			<h3>Место проведения</h3>
			<Card className={st.address}>
				<div className={st.wrapper}>
					<div className={st.address__left}>
						<Controller
							control={control}
							name="address.country"
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<FormControl fullWidth size="small">
									{status === 'loaded' && (
										<>
											<InputLabel id="country" shrink style={{ backgroundColor: '#fff' }}>
												Страна
											</InputLabel>
											<Select
												labelId="country"
												value={value}
												onChange={onChange}
												onBlur={onBlur}
												label="Страна"
												input={<OutlinedInput error={!!error} />}
											>
												{countries.map((country) => (
													<MenuItem key={country.id} value={country.id}>
														{country.title}
													</MenuItem>
												))}
											</Select>
											<FormHelperText error={!!error}>{error?.message ?? ' '}</FormHelperText>
										</>
									)}
								</FormControl>
							)}
						/>
						<Controller
							name="address.city"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextField
									label="Город"
									InputLabelProps={{ shrink: true }}
									value={value}
									onBlur={onBlur}
									onChange={(event) => {
										onChangeValidator(event, value, onChange);
									}}
									size="small"
									type="text"
									error={!!errors?.address?.city}
									helperText={errors?.address?.city?.message ?? ' '}
								/>
							)}
						/>
						<Controller
							name="address.street"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextField
									label="Улица"
									InputLabelProps={{ shrink: true }}
									value={value}
									onBlur={onBlur}
									onChange={(event) => {
										onChangeValidator(event, value, onChange);
									}}
									size="small"
									type="text"
									error={!!errors?.address?.street}
									helperText={errors?.address?.street?.message ?? ' '}
								/>
							)}
						/>

						<div className={st.address__numbers}>
							<Controller
								name="address.house"
								control={control}
								render={({ field: { onChange, value, onBlur } }) => (
									<TextField
										label="Дом"
										InputLabelProps={{ shrink: true }}
										size="small"
										type="text"
										value={value}
										onBlur={onBlur}
										onChange={(event) => {
											onChangeValidator(event, value, onChange);
										}}
										error={!!errors?.address?.house}
										helperText={errors?.address?.house?.message ?? ' '}
									/>
								)}
							/>

							<Controller
								name="address.office"
								control={control}
								render={({ field: { onChange, value, onBlur } }) => (
									<TextField
										label="Офис/Квартира"
										InputLabelProps={{ shrink: true }}
										value={value}
										onBlur={onBlur}
										onChange={(event) => {
											onChangeValidator(event, value, onChange);
										}}
										size="small"
										type="text"
									/>
								)}
							/>
							<Controller
								name="address.unit"
								control={control}
								render={({ field: { onChange, value, onBlur } }) => (
									<TextField
										label="Блок"
										InputLabelProps={{ shrink: true }}
										value={value}
										onBlur={onBlur}
										onChange={(event) => {
											onChangeValidator(event, value, onChange);
										}}
										type="text"
										size="small"
									/>
								)}
							/>
						</div>
					</div>
					<div className={st.address__right}>
						<Controller
							name="address.description"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextField
									label="Опишите, как проехать"
									value={value}
									onBlur={onBlur}
									onChange={(event) => {
										onChangeValidator(event, value, onChange);
									}}
									multiline
									rows={7}
									fullWidth
									className={st.textarea}
									InputLabelProps={{ shrink: true }}
								/>
							)}
						/>
					</div>

					{/* <input type="file" {...register('address.image1')} />
				<input type="file" {...register('address.image2')} />
				<input type="file" {...register('address.image3')} /> */}
				</div>
			</Card>
		</fieldset>
	);
};

export default Address;
