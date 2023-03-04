import React from 'react';

import { Loader } from 'library/components/common';

import st from './BoomstreamPlayer.module.scss';

interface Props {
	code?: string;
}
const BoomstreamPlayer: React.FC<Props> = ({ code }) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setIsLoading(true);
	}, [code]);

	return (
		<div className={st.wrapper}>
			<div className={st.container}>
				{isLoading && (
					<div className={st.loader}>
						<Loader />
					</div>
				)}
				<iframe
					title="videoFrame"
					src={`https://play.boomstream.com/${code}/?title=0`}
					scrolling="no"
					allowFullScreen
					onLoad={() => setIsLoading(false)}
				/>
			</div>
		</div>
	);
};

export default BoomstreamPlayer;
