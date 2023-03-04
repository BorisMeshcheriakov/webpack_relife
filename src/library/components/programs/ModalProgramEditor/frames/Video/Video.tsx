import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { VideoList } from '..';

import st from './Video.module.scss';
import { AddCard } from '../AddPromo';

const Video: React.FC = () => {
	const {
		watch,
		formState: { errors },
	} = useFormContext();
	const periodicity = watch('periodicity');
	const promoVideo = watch('promo_video');

	return (
		<div className={st.videos}>
			<DndProvider backend={HTML5Backend}>
				{/* <Card className={st.promoVideo}>
					<Controller
						name="promo_video"
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<AddVideo
								videoType={['B']}
								value={{ file: value, video_type: 'B', url: '' }}
								onChange={(e: { file: FileList; video_type: 'B'; url: string }) => onChange(e.file)}
								error={error}
								size="small"
								placeholder="Трейлер"
							/>
						)}
					/>
				</Card> */}

				{/* <Video promoVideo={promoVideo} /> */}
				<AddCard promoVideo={promoVideo} error={!!errors.promo_video} />

				<VideoList periodicity={periodicity} />
			</DndProvider>
		</div>
	);
};

export default Video;
