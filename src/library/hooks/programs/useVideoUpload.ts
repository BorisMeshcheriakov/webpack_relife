import React from 'react';
import { VideoEditorValues } from 'library/types/programs';
import { videoService } from 'library/api/videoService';

const useVideoUpload = (type: string = 'video') => {
	const [progress, setProgress] = React.useState<number>(0);
	const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'loading'>('idle');

	const config = {
		onUploadProgress: (progressEvent: any) => {
			let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			setProgress(percentCompleted);
		},
	};

	const createFormdata = (data: VideoEditorValues, videoType: string) => {
		const exercise = new FormData();

		if (videoType !== 'promo') {
			exercise.append('title', data.title);
			exercise.append('description', data.description);
			data.tags.forEach((tag) => exercise.append('common_tag', JSON.stringify(tag)));
		}

		switch (data.video.video_type) {
			case 'B':
				if (data.video.file && data.video.file.item(0)) {
					exercise.append('video_type', 'B');
					exercise.append('file', data.video.file.item(0)!);
				}
				break;
			case 'Y':
				exercise.append('video_type', 'Y');
				exercise.append('youtube_url', data.video.url);
				break;
			default:
				break;
		}

		if (data.screenshot_url instanceof FileList && data.screenshot_url.item(0))
			exercise.append('preview', data.screenshot_url.item(0)!);

		return exercise;
	};

	const createVideo = async (data: VideoEditorValues) => {
		setUploadStatus('loading');
		const exercise = createFormdata(data, 'video');
		const response = await videoService.createExercise(exercise, config);
		setUploadStatus('idle');
		return response.data;
	};

	const updateVideo = async (id: string, data: VideoEditorValues) => {
		setUploadStatus('loading');
		const exercise = createFormdata(data, 'video');
		const response = await videoService.updateExercise(id, exercise, config);
		setUploadStatus('idle');
		return response.data;
	};

	const createPromo = async (data: VideoEditorValues) => {
		setUploadStatus('loading');
		const promo = createFormdata(data, 'promo');
		const response = await videoService.createVideo(promo, config);
		setUploadStatus('idle');
		return response.data;
	};

	const updatePromo = async (id: number, data: VideoEditorValues) => {
		setUploadStatus('loading');
		const promo = createFormdata(data, 'promo');
		const response = await videoService.updateVideo(id, promo, config);
		setUploadStatus('idle');
		return response.data;
	};

	return {
		createVideo,
		updateVideo,
		createPromo,
		updatePromo,
		uploadStatus,
		videoProgress: progress,
	};
};

export default useVideoUpload;
