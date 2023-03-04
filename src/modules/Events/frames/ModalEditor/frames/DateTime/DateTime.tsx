import { FC } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { useEventEditorTime } from 'library/hooks/events';
import { Box, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Card } from 'library/components/ui';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { ButtonAddBlock } from 'library/components/events';
import { TimePicker } from 'library/components/common';

import ruLocale from 'date-fns/locale/ru';

import st from './DateTime.module.scss';

type Props = {
	editFild: (index: number) => boolean;
};

const DateTime: FC<Props> = ({ editFild }) => {
	const { control, register } = useFormContext();
	const { setDates, timeFromName, timeFromDayName, timeToName } = useEventEditorTime();
	const {
		fields: dayFields,
		append: appendDay,
		remove: removeDay,
	} = useFieldArray({
		name: 'timetable',
		control,
	});

	return (
		<fieldset className={st.datetime}>
			<h3>Дата и время проведения мероприятия</h3>
			<div className={st.datetime__add}>
				<ButtonAddBlock
					type="button"
					onClick={() =>
						appendDay({
							time_from_day: new Date(),
							time_from: new Date(),
							time_to: new Date(),
						})
					}
				/>
			</div>

			{dayFields.map((field, index, arr) => (
				<Card className={st.date} key={`index${Math.random()}`}>
					<Controller
						control={control}
						name={timeFromDayName(index)}
						render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
								<MuiDatePicker
									label="Дата"
									value={value}
									mask="__.__.____"
									inputFormat="dd.MM.yyyy"
									disabled={editFild(index)}
									onChange={(newValue) => {
										setDates(index, newValue);
										onChange(newValue);
									}}
									renderInput={(params) => (
										<TextField
											InputLabelProps={{ shrink: true }}
											size="small"
											{...params}
											error={!!error}
											onBlur={onBlur}
											helperText={error?.message ?? ' '}
											inputProps={{
												...params.inputProps,
												placeholder: 'дд.мм.гггг',
											}}
										/>
									)}
								/>
							</LocalizationProvider>
						)}
					/>
					<Box>
						<TimePicker
							control={control}
							label="Начало"
							index={index}
							disabled={editFild(index)}
							name={timeFromName(index)}
						/>
					</Box>
					<Box>
						<TimePicker
							control={control}
							label="Конец"
							index={index}
							disabled={editFild(index)}
							name={timeToName(index)}
						/>
					</Box>
					{arr.length > 1 && !editFild(index) && (
						<div className={st.date__close}>
							<IconButton type="button" onClick={() => removeDay(index)}>
								<Close />
							</IconButton>
						</div>
					)}
				</Card>
			))}
		</fieldset>
	);
};

export default DateTime;
