import { SimplePromoVideo } from 'library/models/video';
import React from 'react';

import { Card } from 'library/components/ui';

import st from './Video.module.scss';
import { BoomstreamPlayer } from 'library/components/programs';

type Props = {
	video: SimplePromoVideo;
};

const Video: React.FC<Props> = ({ video }) => {
	return (
		<Card className={st.video}>
			<BoomstreamPlayer code={video.code} />
		</Card>
	);
};

export default Video;
