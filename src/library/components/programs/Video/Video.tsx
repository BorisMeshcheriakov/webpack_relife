import React from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { ExerciseVideoList, ProgramVideo } from 'library/models/video';

import { useVideoDelete } from 'library/hooks/programs';
import { useModuleSettings } from 'library/hooks/module';

import { IconButtonGrey, VideoMenu } from 'library/components/programs';

import { PlayArrow, Close } from '@mui/icons-material';
import { Periodicity } from './frames';

import st from './Video.module.scss';

import { icons } from 'resources/icons/program';

interface Props {
	video: ExerciseVideoList | ProgramVideo | any;
	videoType: string;
	onPlay?: (id: number) => void;
	onSelect?: (id: ExerciseVideoList | ProgramVideo) => void;
	selected?: boolean;
	mode?: 'view' | 'select' | 'editor';
	periodicity?: boolean;
}

const Video: React.FC<Props> = ({
	video,
	videoType,
	onPlay,
	onSelect,
	selected,
	mode,
	periodicity,
}) => {
	const { deleteVideo } = useVideoDelete();
	const { moduleSettings } = useModuleSettings();

	const handleSelect = (video: ExerciseVideoList | ProgramVideo) =>
		onSelect ? onSelect(video) : () => {};

	const onVideoClick = () => {
		if (mode === 'select') handleSelect(video);
	};

	const handlePlay = (e: any) => {
		e.stopPropagation();
		return onPlay ? onPlay(video.id) : () => {};
	};

	return (
		<div className={cn(st.video, mode === 'select' && st.select)} onClick={onVideoClick}>
			<div className={st.card}>
				{!selected && (
					<img className={st.card__image} src={video.screenshot_url} alt={video.title} />
				)}

				<div
					className={cn(
						st.card__background,
						((selected && mode === 'select') || periodicity) && st.selected
					)}
				>
					<div className={st.card__filler} />
					<div className={st.card__select}>
						{mode === 'select' && (
							<div className={cn(st.checkbox, selected && st.checked)}>
								{selected && <SVG src={icons.check} />}
							</div>
						)}
					</div>
				</div>

				<div className={st.card__play}>
					<IconButtonGrey onClick={handlePlay}>
						<PlayArrow />
					</IconButtonGrey>
				</div>

				{(mode === 'view' || !mode || !moduleSettings?.library) && (
					<div className={st.card__menu}>
						<VideoMenu video={video} size="small" videoType={videoType} />
					</div>
				)}

				{mode === 'editor' && moduleSettings?.library && (
					<div className={st.card__close} onClick={() => deleteVideo(video.id)}>
						<IconButtonGrey>
							<Close fontSize="small" />
						</IconButtonGrey>
					</div>
				)}

				{periodicity && (
					<div className={st.card__periodicity}>
						<Periodicity id={video.id} />
					</div>
				)}
			</div>
			<h3 className={st.title}>{video.title}</h3>
		</div>
	);
};

export default Video;
