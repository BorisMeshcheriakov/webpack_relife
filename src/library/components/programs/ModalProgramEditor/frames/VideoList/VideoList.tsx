import React from 'react';
import update from 'immutability-helper';

import { ProgramVideo } from 'library/models/video';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import { selectProgramVideos, setProgramVideoList } from 'library/redux/programs';

import { DraggableCard } from 'library/components/programs';

type Props = {
	periodicity: boolean;
};

const VideoList: React.FC<Props> = ({ periodicity }) => {
	const dispatch = useAppDispatch();
	const exercises = useAppSelector(selectProgramVideos);

	const moveCard = React.useCallback(
		(dragIndex: number, hoverIndex: number) => {
			let newExercises = update(exercises, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, exercises[dragIndex] as ProgramVideo],
				],
			});
			dispatch(setProgramVideoList(newExercises));
		},
		[exercises, dispatch]
	);

	const renderCard = React.useCallback(
		(video: ProgramVideo, index: number, periodicity: boolean) => {
			return (
				<DraggableCard
					key={video.id}
					index={index}
					id={video.id}
					text={video.title}
					video={video}
					moveCard={moveCard}
					periodicity={periodicity}
				/>
			);
		},
		[moveCard]
	);

	return (
		<>
			{exercises.map((video, i) => (
				<React.Fragment key={video.id}>{renderCard(video, i, periodicity)}</React.Fragment>
			))}
		</>
	);
};

export default VideoList;
