import React from 'react';
import { useFormContext } from 'react-hook-form';

import { VideoEditorValues } from 'library/types/programs';
import { BoomstreamPlayer, YoutubePlayer } from 'library/components/programs';

const Player: React.FC = () => {
	const { getValues } = useFormContext<VideoEditorValues>();

	const video = getValues('video');

	return (
		<>
			{video.video_type === 'B' && <BoomstreamPlayer code={video.code} />}
			{video.video_type === 'Y' && <YoutubePlayer url={video.url} />}
		</>
	);
};

export default Player;
