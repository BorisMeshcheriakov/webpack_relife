import React from 'react';
import cn from 'classnames';

import { Card } from 'library/components/ui';

import st from './VideoCard.module.scss';
import { ProgramVideo } from 'library/models/video';

type Props = {
	onClick: (video: ProgramVideo) => void;
	video: ProgramVideo;
	isActive: boolean;
};

const VideoCard: React.FC<Props> = ({ onClick, video, isActive }) => {
	return (
		<Card className={cn(st.card, isActive && st.active)} onClick={() => onClick(video)}>
			<img src={video.screenshot_url} alt={video.title} className={st.card__image} />
			<h4 className={st.card__title}>{video.title}</h4>
		</Card>
	);
};

export default VideoCard;
