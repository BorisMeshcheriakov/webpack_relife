import { videoService } from 'library/api/videoService';
import { openDialogModal, showPopup } from 'library/redux/modal';
import {
	resetVideoList,
	selectProgramVideos,
	setProgramVideoList,
	setVideo,
} from 'library/redux/programs';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { useModuleSettings } from '../module';

// TODO диалоговые окна удаления

const useVideoDelete = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch();
	const exercises = useAppSelector(selectProgramVideos);

	const { moduleSettings } = useModuleSettings();

	const removeFromExercises = (id: number | string) => {
		let videos = [...exercises];
		let idx = videos.findIndex((video) => video.id === id);
		if (idx !== -1) {
			videos.splice(idx, 1);
			dispatch(setProgramVideoList(videos));
		}
	};

	const removeVideo = async (id: number | string) => {
		let message = '';
		let messageType: 'success' | 'error' = 'success';

		try {
			await videoService.deleteExercise(id);

			removeFromExercises(id);
			message = 'Видео успешно удалено';

			dispatch(resetVideoList());
			dispatch(setVideo(null));
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			console.error(error);
			messageType = 'error';
			message = `Не удалось удалить видео`;
		}
		dispatch(showPopup({ type: messageType, text: message }));
	};

	const beginRemoveDialog = (id: number | string) => {
		dispatch(
			openDialogModal({
				title: 'Удаление видео',
				text: 'Вы действительно хотите удалить видео?',
				confirmText: 'Удалить',
				confirm: () => removeVideo(id),
				declineText: 'Оставить',
			})
		);
	};

	const deleteVideo = async (videoId: number | string) => {
		if (exercises.length && moduleSettings?.library) {
			// Открыт редактор - убрать видео из списка
			removeFromExercises(videoId);
			if (onSuccess) {
				onSuccess();
			}
		} else {
			// Открыт список видео - удалить видео
			beginRemoveDialog(videoId);
		}
	};

	return {
		deleteVideo,
	};
};

export default useVideoDelete;
