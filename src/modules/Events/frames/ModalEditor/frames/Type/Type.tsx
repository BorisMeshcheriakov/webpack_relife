import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTypes } from 'library/hooks/events';
import { useParams } from 'react-router-dom';

import {
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	TextField,
	Divider,
	Select,
	MenuItem,
	InputLabel,
	FormHelperText,
} from '@mui/material';

import { Card } from 'library/components/ui';

import st from './Type.module.scss';

type Props = {};

const Type: FC<Props> = (props: Props) => {
	const {
		register,
		control,
		watch,
		formState: { errors },
	} = useFormContext();
	const types = useTypes();
	const { id } = useParams<{ id: string }>();

	return (
		<fieldset>
			<h3>Тип мероприятия</h3>
			<Card className={st.type}>
				<div className={st.wrap}>
					{types.status === 'loaded' && (
						<Controller
							control={control}
							name="event_type"
							render={({ field: { value, onChange, onBlur } }) => (
								<FormControl size="small" className={st.select} sx={{ width: '231px' }}>
									<InputLabel
										htmlFor="event_type"
										sx={{ backgroundColor: '#fff' }}
										shrink
										error={!!errors.event_type}
									>
										Тип мероприятия
									</InputLabel>
									<Select
										onBlur={onBlur}
										id="event_type"
										value={value}
										onChange={onChange}
										label="Тип мероприятия"
										error={!!errors.event_type}
									>
										<div className={st.select}>
											<TextField
												value={types.newType}
												onChange={types.onTypeInputChange}
												onKeyDown={types.onEnterDown}
												fullWidth
												size="small"
												placeholder="Другое..."
												error={!!types.error}
												helperText={types.error ?? ' '}
											/>
										</div>
										{types.types.map((type) => (
											<MenuItem key={type.id} value={type.title}>
												{type.title}
											</MenuItem>
										))}
									</Select>

									<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.event_type}>
										{errors.event_type?.message ?? ' '}
									</FormHelperText>
								</FormControl>
							)}
						/>
					)}

					<Controller
						control={control}
						name="mode"
						render={({ field: { value, onChange, onBlur } }) => (
							<div className={st.wrapMode}>
								<RadioGroup row value={value} onChange={onChange} onBlur={onBlur}>
									<FormControlLabel
										value="O"
										label="Оффлайн"
										disabled={!!id}
										control={<Radio checked={value === 'O'} />}
									/>

									<div className={st.driver} />
									<FormControlLabel
										value="N"
										label="Онлайн"
										disabled={!!id}
										control={<Radio checked={value === 'N'} />}
									/>
								</RadioGroup>

								<FormHelperText sx={{ marginLeft: '14px' }} error={!!errors.mode}>
									{errors.mode?.message ?? ' '}
								</FormHelperText>
							</div>
						)}
					/>

					{/* <a href="http://" target="_blank" rel="noopener noreferrer">
					Что такое тип мероприятия
				</a> */}
				</div>
			</Card>
		</fieldset>
	);
};

export default Type;
