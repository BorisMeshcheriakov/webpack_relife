import React from 'react';

import { ExerciseVideoList, ProgramVideo } from 'library/models/video';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import {
	selectProgramVideos,
	selectedVideosList,
	setSelectedVideoList,
	setProgramVideoList,
} from 'library/redux/programs';

const useVideoSelect = () => {
	const dispatch = useAppDispatch();

	const videos = useAppSelector(selectProgramVideos);
	const selectedVideos = useAppSelector(selectedVideosList);

	const onSelect = (video: ProgramVideo | ExerciseVideoList) => {
		let videos = [...selectedVideos];
		const idx = videos.findIndex((selected) => selected.id === video.id);
		if (idx === -1) {
			videos.push(video as ProgramVideo);
		} else {
			videos.splice(idx, 1);
		}
		dispatch(setSelectedVideoList(videos));
	};

	const isSelected = (video: ExerciseVideoList) => {
		return !!selectedVideos.find((selected) => selected.id === video.id);
	};

	const saveSelected = () => {
		dispatch(setProgramVideoList(selectedVideos));
	};

	React.useEffect(() => {
		dispatch(setSelectedVideoList(videos));
	}, [videos, dispatch]);

	return {
		selected: selectedVideos,
		onSelect,
		isSelected,
		saveSelected,
	};
};

export default useVideoSelect;
