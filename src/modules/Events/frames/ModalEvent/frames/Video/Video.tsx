import React from 'react';

import { CircularProgress } from '@mui/material';

import styles from './Video.module.scss';
import { PresentationVideo } from 'library/models/video';
import { useEventVideo } from 'library/hooks/events';
interface Props {
	video: PresentationVideo;
}

const Video: React.FC<Props> = ({ video }) => {
	const [code, setCode] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');

	const eventVideo = useEventVideo();

	const getVideo = React.useCallback(async () => {
		if (video.code) {
			return;
		}

		function timeout(ms: number) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		const totalTries = 10;
		let numberOfTry = 0;
		while (numberOfTry < totalTries) {
			numberOfTry += 1;
			try {
				const response = await eventVideo.getVideo(video.id);
				if (!response?.data.code) {
					throw response;
				}
				setCode(response?.data.code);
				break;
			} catch (e) {
				console.error('Не удалось загрузить видео');
			}
			await timeout(3000);
		}
		setError('Не удалось загрузить видео');
	}, [video?.code]);

	React.useEffect(() => {
		getVideo();
	}, []);

	return (
		<>
			<div className={styles.videoWrapper}>
				{!video.code && !code ? (
					<div className={styles.videoFrame}>{error ? error : <CircularProgress />}</div>
				) : (
					<iframe
						title="eventVideo"
						src={`https://play.boomstream.com/${video.code ? video.code : code}?title=0`}
						frameBorder="0"
						scrolling="no"
						allowFullScreen
						className={styles.videoFrame}
					></iframe>
				)}
			</div>
		</>
	);
};

export default Video;
