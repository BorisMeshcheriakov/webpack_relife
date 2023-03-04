import React from 'react';
import { ExerciseVideoList, ProgramVideo, SimplePromoVideo } from 'library/models/video';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import useVideoDelete from './useVideoDelete';
import { useModuleSettings } from '../module';

const useVideoMenu = (
	video: ExerciseVideoList | ProgramVideo | SimplePromoVideo | null,
	videoType: string
) => {
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const { id, videoId } = useParams<{ id: string; videoId: string }>();
	const { locationRoot } = useModuleSettings();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const openEdit = () => {
		if (video) {
			// Проверяем, открыто ли окно просмотра видео
			push(videoId ? `${url}/edit` : `${url}/${videoType}/${video.id}/edit`);
		}
	};

	const getLink = () => {
		const isManagerOpen = url.includes('manager');
		if (isManagerOpen) {
			return id ? `/${locationRoot}/manager/program/${id}/edit` : `/${locationRoot}/manager`;
		} else {
			return `/${locationRoot}/program/${id}/edit`;
		}
	};

	const onSuccess = () => push(getLink());

	const { deleteVideo } = useVideoDelete(onSuccess);

	const handleClick = (video: any) => {
		setAnchorEl(video.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const edit = () => {
		if (video) {
			openEdit();
			handleClose();
		}
	};

	const remove = () => {
		if (video) {
			deleteVideo(video.id);
			handleClose();
		}
	};

	const items =
		videoType === 'video'
			? [
					{
						title: 'Изменить',
						action: edit,
					},
					{
						title: 'Удалить',
						action: remove,
					},
			  ]
			: [
					{
						title: 'Изменить',
						action: edit,
					},
			  ];

	return {
		open,
		anchorEl,
		handleClick,
		handleClose,
		items,
	};
};

export default useVideoMenu;
