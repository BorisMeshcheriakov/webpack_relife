import React from 'react';
import cn from 'classnames';

import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { SimplePromoVideo } from 'library/models/video';
import { Video } from 'library/components/programs';
import { Card } from 'library/components/ui';

import st from './styles.module.scss';
import { IconButton } from 'shared/ui';
import { ArrowDownward } from 'shared/assets';

type Props = {
	promoVideo: SimplePromoVideo;
	error: boolean;
};

export const AddCard: React.FC<Props> = ({ promoVideo, error }) => {
	const { url } = useRouteMatch();
	const { push } = useHistory();

	const onPlay = () => push(`${url}/promo/${promoVideo.id}`);

	return (
		<>
			{promoVideo ? (
				<Video video={promoVideo} videoType="promo" onPlay={onPlay} />
			) : (
				<Link to={`${url}/promo/new/edit`}>
					<Card className={st.card}>
						<div className={cn(st.card__inner, error && st.error)}>
							<div className={st.card__button}>
								<span>Трейлер</span>
								<IconButton>
									<ArrowDownward />
								</IconButton>
							</div>
						</div>
					</Card>
				</Link>
			)}
		</>
	);
};
