import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { fieldToUppercase } from 'library/helpers/events';
import { TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { Card } from 'library/components/ui';
import { ButtonAddBlock, ImageInput } from 'library/components/events';

import st from './Coach.module.scss';

type Props = {};

const Coach: FC = (props: Props) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const {
		fields: coachFields,
		append: appendCoach,
		remove: removeCoach,
	} = useFieldArray({
		name: 'event_coach',
		control,
	});

	return (
		<fieldset className={st.coaches}>
			<h3>Ведущие</h3>
			<div className={st.coaches__add}>
				<ButtonAddBlock
					type="button"
					className={st.add}
					onClick={() =>
						appendCoach({
							last_name: '',
							first_name: '',
							middle_name: '',
							photo: '',
							description: '',
						})
					}
				/>
			</div>
			{coachFields.map((field, index) => (
				<Card key={index} className={st.coach}>
					<div className={st.wrapper}>
						<div className={st.photo}>
							<ImageInput
								fieldName={`event_coach.${index}.photo` as `event_coach.0.photo`}
								className={st.photo}
							/>
						</div>
						<div className={st.info}>
							<section className={st.info__name}>
								<TextField
									type="text"
									size="small"
									label="Фамилия"
									error={
										!!(
											errors?.event_coach &&
											errors?.event_coach[index] &&
											errors.event_coach[index]?.last_name
										)
									}
									helperText={
										errors.event_coach &&
										errors.event_coach[index] &&
										errors.event_coach[index]?.last_name
											? errors.event_coach[index]?.last_name?.message
											: ' '
									}
									InputLabelProps={{ shrink: true }}
									{...register(`event_coach.${index}.last_name` as `event_coach.0.last_name`, {
										onChange: (e) => (e.target.value = fieldToUppercase(e)),
									})}
								/>
								<TextField
									type="text"
									size="small"
									label="Имя"
									error={
										!!(
											errors?.event_coach &&
											errors.event_coach[index] &&
											errors.event_coach[index]?.first_name
										)
									}
									helperText={
										errors?.event_coach &&
										errors.event_coach[index] &&
										errors.event_coach[index]?.first_name
											? errors.event_coach[index]?.first_name?.message
											: ' '
									}
									InputLabelProps={{ shrink: true }}
									{...register(`event_coach.${index}.first_name` as `event_coach.0.first_name`, {
										onChange: (e) => (e.target.value = fieldToUppercase(e)),
									})}
								/>

								<TextField
									type="text"
									size="small"
									label="Отчество"
									InputLabelProps={{ shrink: true }}
									{...register(`event_coach.${index}.middle_name` as `event_coach.0.middle_name`, {
										onChange: (e) => (e.target.value = fieldToUppercase(e)),
									})}
								/>
							</section>
							<section className={st.info__description}>
								<TextField
									multiline
									rows={4}
									label="О ведущем"
									error={
										!!(
											errors?.event_coach &&
											errors.event_coach[index] &&
											errors.event_coach[index]?.description
										)
									}
									helperText={
										errors?.event_coach &&
										errors.event_coach[index] &&
										errors.event_coach[index]?.description
											? errors.event_coach[index]?.description?.message
											: ' '
									}
									InputLabelProps={{ shrink: true }}
									fullWidth
									className={st.textarea}
									{...register(`event_coach.${index}.description` as `event_coach.0.description`, {
										onChange: (e) => (e.target.value = fieldToUppercase(e)),
									})}
								/>
							</section>
						</div>
						<div className={st.delete}>
							<IconButton type="button" onClick={() => removeCoach(index)}>
								<Close />
							</IconButton>
						</div>
					</div>
				</Card>
			))}
		</fieldset>
	);
};

export default Coach;
