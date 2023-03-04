import React from 'react';
import qs from 'query-string';

import st from './YoutubePlayer.module.scss';

type Props = {
	url: string | undefined;
};

const YoutubePlayer: React.FC<Props> = ({ url }) => {
	const getYoutubeCode = (url: string | undefined) => {
		let { query } = qs.parseUrl(url as string);
		return (query.v as string) ?? '';
	};

	return (
		<div className={st.container}>
			<iframe
				src={`https://www.youtube.com/embed/${getYoutubeCode(url)}`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};

export default YoutubePlayer;
