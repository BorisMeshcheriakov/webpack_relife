import React from 'react';
import cn from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { VideoEditorValues } from 'library/types/programs';

import { useModuleSettings } from 'library/hooks/module';
import { useAppSelector } from 'library/hooks/common';

import { selectTags } from 'library/redux/programs';

import { ImageInput, TagSelector } from 'library/components/programs';
import { Card } from 'library/components/ui';
import TextField from '@mui/material/TextField';

import { fieldToUppercase } from 'library/helpers/events';

import st from './Head.module.scss';

type Props = {
	videoType: string;
};

const Head: React.FC<Props> = ({ videoType }) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<VideoEditorValues>();

	const list = useAppSelector(selectTags);

	const { moduleSettings } = useModuleSettings();

	return (
		<Card className={st.head}>
			<div
				className={cn(
					st.head__image
					// errors.previewFile &&
					// st.error
				)}
			>
				<Controller
					name="screenshot_url"
					control={control}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<>
							<ImageInput value={value} onChange={onChange} className={st.uploader} error={error} />
						</>
					)}
				/>
			</div>
			<div className={st.head__data}>
				{videoType === 'video' && (
					<>
						<TextField
							{...register('title', {
								onChange: (e) => (e.target.value = fieldToUppercase(e)),
							})}
							fullWidth
							multiline
							rows={1}
							error={!!errors?.title}
							helperText={errors.title?.message ?? ' '}
						/>

						{moduleSettings?.library && (
							<Controller
								name="tags"
								control={control}
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagSelector tags={list} value={value} onChange={onChange} error={!!error} />
								)}
							/>
						)}
					</>
				)}
			</div>
		</Card>
	);
};

export default Head;
