import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { ArrowDownward } from '@mui/icons-material';
import { Card } from 'library/components/ui';
import { PresentationVideo } from 'library/models/video';
import { useParams } from 'react-router-dom';

import st from './Video.module.scss';

interface Props {
	videoInfo: PresentationVideo | undefined;
}

const Video: FC<Props> = (videoInfo) => {
	const { register, getValues, watch } = useFormContext();
	const { id } = useParams<{ id: string }>();
	watch('presentation_video');
	const video = getValues('presentation_video');

	const videoName = useMemo(() => {
		if (!id) {
			// videoName при создании мероприятия
			return video instanceof FileList && video.length
				? `Загруженный файл: ${video?.item(0)?.name} `
				: 'Выберите файл для загрузки';
		} else {
			// videoName при редактировании мероприятия
			return video instanceof FileList && video.length
				? `Загруженный файл: ${video?.item(0)?.name} `
				: videoInfo && videoInfo?.videoInfo?.title
				? `Загруженный файл: ${videoInfo?.videoInfo?.title}`
				: 'Выберите файл для загрузки';
		}
	}, [video]);

	return (
		<fieldset>
			<h3>Презентационное видео о мероприятии</h3>
			<Card className={st.card}>
				<label htmlFor="video_file">
					<div className={st.wrapper}>
						<div className={st.video}>
							<div className={st.video__icon}>
								<ArrowDownward fontSize="large" />
							</div>
							<span className={st.video__title}>{videoName}</span>
						</div>
						<input
							id="video_file"
							style={{ display: 'none' }}
							type="file"
							accept="video/mp4,video/x-m4v,video/*"
							{...register('presentation_video')}
						/>
					</div>
				</label>
			</Card>
		</fieldset>
	);
};

export default Video;
