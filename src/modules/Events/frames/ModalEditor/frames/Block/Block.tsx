import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { Card } from 'library/components/ui';
import { ButtonAddBlock, ImageInput } from 'library/components/events';

import { fieldToUppercase } from 'library/helpers/events';

import st from './Block.module.scss';

const Block: FC = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const {
		fields: blockFields,
		append: appendBlock,
		remove: removeBlock,
	} = useFieldArray({
		name: 'event_block',
		control,
	});

	return (
		<fieldset className={st.blocks}>
			<h3>Универсальныe блоки</h3>
			<div className={st.blocks__add}>
				<ButtonAddBlock
					type="button"
					className={st.add}
					onClick={() =>
						appendBlock({
							title: '',
							subtitle: '',
							image: '',
							description: '',
						})
					}
				/>
			</div>
			{blockFields.map((field, index) => (
				<Card key={index} className={st.block}>
					<div className={st.block__info}>
						<div className={st.block__title}>
							<TextField
								type="text"
								size="small"
								label="Название блока"
								autoComplete="new-password"
								error={
									!!(
										errors?.event_block &&
										errors.event_block[index] &&
										errors.event_block[index]?.title
									)
								}
								helperText={
									errors?.event_block &&
									errors.event_block[index] &&
									errors.event_block[index]?.title
										? errors.event_block[index]?.title?.message
										: ' '
								}
								InputLabelProps={{ shrink: true }}
								{...register(`event_block.${index}.title` as `event_block.0.title`, {
									onChange: (e) => (e.target.value = fieldToUppercase(e)),
								})}
							/>

							<TextField
								type="text"
								size="small"
								label="Подзаголовок"
								autoComplete="new-password"
								helperText=" "
								InputLabelProps={{ shrink: true }}
								{...register(`event_block.${index}.subtitle` as `event_block.0.subtitle`, {
									onChange: (e) => (e.target.value = fieldToUppercase(e)),
								})}
							/>
						</div>

						<div className={st.block__text}>
							<ImageInput
								fieldName={`event_block.${index}.image` as `event_block.0.image`}
								className={st.block__photo}
							/>
							<div className={st.block__description}>
								<TextField
									fullWidth
									multiline
									label="Описание"
									autoComplete="new-password"
									rows={3}
									InputLabelProps={{ shrink: true }}
									className={st.textarea}
									{...register(`event_block.${index}.description` as `event_block.0.description`, {
										onChange: (e) => (e.target.value = fieldToUppercase(e)),
									})}
								/>
							</div>
						</div>
					</div>
					<div className={st.block__close}>
						<IconButton onClick={() => removeBlock(index)}>
							<Close />
						</IconButton>
					</div>
				</Card>
			))}
		</fieldset>
	);
};

export default Block;
