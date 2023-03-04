import React from 'react';
import { ProgramVideo } from 'library/models/video';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { selectProgramVideos, selectExcludedVideos, setExcluded } from 'library/redux/programs';
import { IconButton } from '@mui/material';

type Props = {
	id: number;
};

const Periodicity: React.FC<Props> = ({ id }) => {
	const programVideos = useAppSelector(selectProgramVideos);
	const excluded = useAppSelector(selectExcludedVideos);
	const dispatch = useAppDispatch();

	const isChecked = (day: number, id: number, excluded: number[][]) => {
		return !!!excluded[day]?.find((el) => el === id);
	};

	const checkVideo = (day: number, id: number, excluded: number[][], videos: ProgramVideo[]) => {
		let allVideos = videos.map((video) => video.id);
		let currentExcluded = excluded[day];
		let finalExcluded = [...excluded];

		if (currentExcluded.includes(id)) {
			currentExcluded = currentExcluded.filter((video) => video !== id);
			finalExcluded[day] = [...currentExcluded];
		} else {
			let filter = allVideos.filter(
				(videoId: number) => videoId === id || currentExcluded.includes(videoId)
			);
			finalExcluded[day] = [...filter];
		}
		dispatch(setExcluded(finalExcluded));
		return;
	};

	const days = [0, 1, 2, 3, 4, 5, 6];

	const buttonStyle = {
		width: '20px',
		height: '20px',
		padding: 0,
		backgroundColor: '#fff',
		'&:hover': {
			backgroundColor: '#4198c5',
			color: '#fff',
		},
	};

	const uncheckStyle = {
		width: '20px',
		height: '20px',
		backgroundColor: 'transparent',
		border: '1px solid #fff',
		'&:hover': {
			border: '1px solid #4198c5',
		},
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '200px',
				paddingBottom: '10px',
			}}
		>
			{days.map((day) => (
				<IconButton
					key={day}
					sx={isChecked(day, id, excluded) ? { ...buttonStyle } : { ...uncheckStyle }}
					onClick={() => checkVideo(day, id, excluded, programVideos)}
				>
					{isChecked(day, id, excluded) && <span style={{ fontSize: 12 }}>{day + 1}</span>}
				</IconButton>
			))}
		</div>
	);
};

export default Periodicity;
