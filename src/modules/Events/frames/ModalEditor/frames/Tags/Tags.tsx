import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	OutlinedInput,
	TextField,
	Checkbox,
	ListItemText,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useFormContext, Controller } from 'react-hook-form';
import React from 'react';
import { Card } from 'library/components/ui';
import { useTags } from 'library/hooks/events';

import st from './Tags.module.scss';

const Tags: React.FC = () => {
	const { tags } = useTags();
	const { control } = useFormContext();

	const getTagName = (pk: number) => {
		const tag = tags.find((tag) => tag.pk === pk);
		return tag?.title ?? pk;
	};

	return (
		<fieldset>
			<h3>Теги</h3>
			<Card className={st.tags}>
				<Controller
					control={control}
					name="tag"
					render={({ field: { value, onChange } }) => (
						<FormControl sx={{ width: 231 }} size="small">
							<InputLabel
								htmlFor="tag-select"
								id="tag-select-label"
								shrink
								style={{ backgroundColor: '#fff' }}
							>
								Теги
							</InputLabel>
							<Select
								label="Теги"
								id="tag-select"
								labelId="tag-select-label"
								key="Теги"
								input={<OutlinedInput placeholder="Выберите теги..." className={st.input} />}
								value={value}
								onChange={onChange}
								renderValue={(selected) => selected.map((pk: number) => getTagName(pk)).join(', ')}
								multiple
							>
								{tags.map((tag) => (
									<MenuItem key={tag.pk} value={tag.pk}>
										<Checkbox checked={value.indexOf(tag.pk) > -1} />
										<ListItemText primary={tag.title} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				/>
			</Card>
		</fieldset>
	);
};

export default Tags;
