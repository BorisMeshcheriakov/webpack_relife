import React from 'react';
import { useParams } from 'react-router-dom';

import { useVideo } from 'library/hooks/programs';

import { Tabs, Tab } from '@mui/material';
import { Loader, ModalLarge } from 'library/components/common';
import { BoomstreamPlayer, YoutubePlayer, VideoMenu } from 'library/components/programs';
import { Card } from 'library/components/ui';
import { Blank } from 'library/components/common';

import st from './ModalVideo.module.scss';

type Props = {
	close: () => void;
	showMenu?: boolean;
};

const ModalVideo: React.FC<Props> = ({ close, showMenu }) => {
	const { videoId, videoType } = useParams<{ videoId: string; videoType: string }>();
	const { video, videoStatus, clearSelected } = useVideo(videoId, videoType);
	const [tab, setTab] = React.useState('player');

	const onClose = () => {
		close();
		clearSelected();
	};

	return (
		<ModalLarge isOpen title="Видео" close={onClose} onRequestClose={onClose}>
			{videoStatus === 'idle' && (
				<div className={st.video}>
					<Card className={st.head}>
						<h2>{video?.title}</h2>
						<div>
							{showMenu && videoType === 'video' && (
								<VideoMenu video={video} videoType={videoType} />
							)}
						</div>
					</Card>
					<Tabs
						value={tab}
						onChange={(event: React.SyntheticEvent, newValue: string) => setTab(newValue)}
					>
						<Tab label="Видео" value="player" sx={{ height: '60px' }} />
						{video && 'description' in video && (
							<Tab label="Описание" value="description" sx={{ height: '60px' }} />
						)}
					</Tabs>
					{tab === 'player' && (
						<Card className={st.player}>
							{video && video.video_type === 'B' && <BoomstreamPlayer code={video?.code} />}

							{video && video.video_type === 'Y' && (
								<YoutubePlayer url={String(video.youtube_url)} />
							)}
						</Card>
					)}

					{video && 'description' in video && tab === 'description' && (
						<Card className={st.description}>
							<div className={st.description__text}>{video?.description}</div>
						</Card>
					)}
				</div>
			)}

			{videoStatus === 'loading' && <Loader />}
			{videoStatus === 'error' && <Blank text="Видео все еще обрабатывается. Попробуйте позже" />}
		</ModalLarge>
	);
};

export default ModalVideo;
