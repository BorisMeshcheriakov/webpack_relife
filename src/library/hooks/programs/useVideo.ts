import React from 'react';

import { videoService } from 'library/api/videoService';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import { selectVideo, setVideo } from 'library/redux/programs';

/**
 * @param id - id запрашиваемого видео
 * Хук для запроса видеоролика, например, при просмотре упражнений
 * в библиотеке
 */

const useVideo = (id: string, type: string = 'video') => {
	const dispatch = useAppDispatch();

	const video = useAppSelector(selectVideo);
	const [videoStatus, setVideoStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');
	const [tryNumber, setTryNumber] = React.useState(0);
	const maxTries = 5;

	const clearSelected = React.useCallback(() => {
		dispatch(setVideo(null));
	}, [dispatch]);

	React.useEffect(() => {
		const getExercise = async (id: number | string, type: string) => {
			setVideoStatus('loading');

			if (!id || id === 'new') {
				clearSelected();
				setVideoStatus('idle');
				return;
			}

			if (tryNumber < maxTries) {
				try {
					const videoId = Number(id);
					const response =
						type === 'video'
							? await videoService.getExercise(videoId)
							: await videoService.getPromoVideo(videoId);
					if (!response.data) {
						throw response;
					}

					if (type === 'video' && response.data.status_code === 'P') {
						setTimeout(() => {
							setTryNumber(tryNumber + 1);
						}, 2000);
						return;
					}

					dispatch(setVideo(response.data));
				} catch (error) {
					console.error(error);
					dispatch(setVideo(null));
				}
			} else {
				setVideoStatus('error');
				return;
			}
			setVideoStatus('idle');
		};

		getExercise(id, type);
	}, [dispatch, id, type, clearSelected, tryNumber]);

	return {
		video,
		videoStatus,
		clearSelected,
	};
};

export default useVideo;
