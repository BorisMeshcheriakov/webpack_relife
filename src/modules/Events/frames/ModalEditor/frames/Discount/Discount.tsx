import { FC } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, IconButton, InputAdornment, FormHelperText, Box } from '@mui/material';
import { Close, AddCircleOutline } from '@mui/icons-material';
import { numberMask } from 'library/helpers/events/timePicker';
import { CustomEditorInputControlled } from 'library/components/authentication/InputsControlled';

import { ButtonAddBlock } from 'library/components/events';
import { Card } from 'library/components/ui';

import ruLocale from 'date-fns/locale/ru';

import st from './Discount.module.scss';

type Props = {};

const Discount: FC = (props: Props) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const {
		fields: discountFields,
		append: appendDiscount,
		remove: removeDiscount,
	} = useFieldArray({
		name: 'discount',
		control,
	});

	return (
		<fieldset className={st.discount}>
			<h3>Скидки</h3>
			<div className={st.discount__add}>
				<ButtonAddBlock
					type="button"
					className={st.add}
					onClick={() =>
						appendDiscount({
							discount_cost: null,
							discount_from: null,
							discount_to: null,
						})
					}
				/>
			</div>

			{discountFields.map((field, index) => (
				<Card key={index} className={st.discount__card}>
					<div className={st.price}>
						<CustomEditorInputControlled
							control={control}
							name={`discount.${index}.discount_cost` as 'discount.0.discount_cost'}
							error={
								!!(
									errors.discount &&
									errors.discount[index] &&
									errors.discount[index]?.discount_cost
								)
							}
							label="Цена"
							sufix={'₽'}
							mask={numberMask}
						/>
						<FormHelperText
							sx={{ marginLeft: '14px' }}
							error={
								!!(
									errors.discount &&
									errors.discount[index] &&
									errors.discount[index]?.discount_cost
								)
							}
						>
							{!!(
								errors.discount &&
								errors.discount[index] &&
								errors.discount[index]?.discount_cost
							)
								? errors.discount[index]?.discount_cost?.message
								: ' '}
						</FormHelperText>
					</div>

					<Controller
						control={control}
						name={`discount.${index}.discount_from` as 'discount.0.discount_from'}
						render={({ field: { value, onChange } }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
								<DatePicker
									label="Начало"
									value={value}
									mask="__.__.____"
									inputFormat="dd.MM.yyyy"
									onChange={(newValue) => {
										onChange(newValue);
									}}
									renderInput={(params) => (
										<TextField
											InputLabelProps={{ shrink: true }}
											size="small"
											{...params}
											inputProps={{
												...params.inputProps,
												placeholder: 'дд.мм.гггг',
											}}
											error={
												!!(
													errors.discount &&
													errors.discount[index] &&
													errors.discount[index]?.discount_from
												)
											}
											helperText={
												!!(
													errors.discount &&
													errors.discount[index] &&
													errors.discount[index]?.discount_from
												)
													? errors.discount[index]?.discount_from?.message
													: ' '
											}
										/>
									)}
								/>
							</LocalizationProvider>
						)}
					/>

					<Controller
						control={control}
						name={`discount.${index}.discount_to` as 'discount.0.discount_cost'}
						render={({ field: { value, onChange } }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
								<DatePicker
									label="Конец"
									value={value}
									mask="__.__.____"
									inputFormat="dd.MM.yyyy"
									onChange={(newValue) => {
										onChange(newValue);
									}}
									renderInput={(params) => (
										<TextField
											InputLabelProps={{ shrink: true }}
											size="small"
											{...params}
											inputProps={{
												...params.inputProps,
												placeholder: 'дд.мм.гггг',
											}}
											error={
												!!(
													errors.discount &&
													errors.discount[index] &&
													errors.discount[index]?.discount_to
												)
											}
											helperText={
												!!(
													errors.discount &&
													errors.discount[index] &&
													errors.discount[index]?.discount_to
												)
													? errors.discount[index]?.discount_to?.message
													: ' '
											}
										/>
									)}
								/>
							</LocalizationProvider>
						)}
					/>

					<div className={st.discount__close}>
						<IconButton type="button" onClick={() => removeDiscount(index)}>
							<Close />
						</IconButton>
					</div>
				</Card>
			))}
		</fieldset>
	);
};

export default Discount;
