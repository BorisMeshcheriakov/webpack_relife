import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ProgramEditorValues } from 'library/types/programs';
import { TagSelector } from 'library/components/programs';
import { selectTags } from 'library/redux/programs';
import { useAppSelector } from 'library/hooks/common';

import st from './styles.module.scss';

const Tags: FC = () => {
	const list = useAppSelector(selectTags);
	const { control } = useFormContext<ProgramEditorValues>();

	return (
		<div className={st.title__tags}>
			<Controller
				name="tags"
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<TagSelector tags={list} value={value} onChange={onChange} error={!!error} />
				)}
			/>
		</div>
	);
};

export default Tags;
