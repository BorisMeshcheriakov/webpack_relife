import React from 'react';

import { VideoEditorValues } from 'library/types/programs';
import { ExerciseVideoDetail, SimplePromoVideo } from 'library/models/video';

import { useAppDispatch } from 'library/hooks/common';
import { useVideo, useVideoUpload, useVideoForm } from 'library/hooks/programs';

import { resetVideoList, updateVideoInList } from 'library/redux/programs';
import { showPopup } from 'library/redux/modal';

const useVideoEditor = (
	id: string,
	videoType: string = 'video',
	close?: (videoType: string, video?: ExerciseVideoDetail | SimplePromoVideo) => void,
	onSuccess?: (id: number) => void
) => {
	const dispatch = useAppDispatch();

	const { video, videoStatus, clearSelected } = useVideo(id, videoType);
	const { methods } = useVideoForm({ video, videoType });
	const { createVideo, updateVideo, createPromo, updatePromo, uploadStatus, videoProgress } =
		useVideoUpload();
	const [editorStatus, setEditorStatus] = React.useState<'idle' | 'loading'>('idle');

	const onSubmit = async (data: VideoEditorValues) => {
		setEditorStatus('loading');
		let message = '';
		let messageType: 'success' | 'error' = 'success';
		try {
			let video: ExerciseVideoDetail | SimplePromoVideo;
			if (id === 'new') {
				video = videoType === 'video' ? await createVideo(data) : await createPromo(data);
				message = 'Видео успешно создано';
			} else {
				let videoId = Number(id);
				video =
					videoType === 'video' ? await updateVideo(id, data) : await updatePromo(videoId, data);
				message = 'Видео успешно обновлено';
			}

			if (videoType === 'video' && 'pk' in video) {
				if (!video.pk) throw video;
				clearSelected();
				if (onSuccess) {
					onSuccess(video.pk);
				} else if (close) {
					close(videoType, video);
				}

				if (id === 'new') {
					dispatch(resetVideoList());
				} else {
					dispatch(updateVideoInList(video));
				}
			}

			if (videoType === 'promo' && close) {
				close(videoType, video);
			}
		} catch (error) {
			console.error(error);
			setEditorStatus('idle');
			messageType = 'error' as 'error';
			message = `Не удалось ${id === 'new' ? 'создать' : 'обновить'} видео`;
		}
		dispatch(showPopup({ type: messageType, text: message }));
		setEditorStatus('idle');
	};

	const handleClose = () => {
		clearSelected();
		if (close) close(videoType);
	};

	return {
		onSubmit,
		videoStatus: videoStatus,
		uploadStatus: uploadStatus,
		videoProgress,
		editorStatus,
		handleClose,
		video,
		methods,
	};
};

export default useVideoEditor;
