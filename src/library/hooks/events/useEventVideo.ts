import React from 'react';
import { videoService } from 'library/api/videoService';

const useEventVideo = () => {
	const [status, setStatus] = React.useState<string>('idle');
	const [progress, setProgress] = React.useState<number>(0);

	const config = {
		onUploadProgress: (progressEvent: any) => {
			let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			setProgress(percentCompleted);
		},
	};

	const createVideo = async (video: File) => {
		setStatus('uploading');
		const data = new FormData();
		data.append('file', video);
		data.append('title', video.name.split('.').slice(0, -1).join('.'));

		try {
			const response = await videoService.createVideo(data, config);
			return response;
		} catch (error) {
			// console.log(error);
		}
		setStatus('uploaded');
	};

	const getUploadStatus = async (pk: number) => {
		try {
			const response = await videoService.getUploadStatus(pk);
			return response;
		} catch (error) {
			// console.log(error);
		}
	};

	const getVideo = async (id: number) => {
		try {
			const response = await videoService.getPromoVideo(id);
			return response;
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		createVideo,
		status,
		progress,
		getUploadStatus,
		getVideo,
	};
};

export default useEventVideo;
