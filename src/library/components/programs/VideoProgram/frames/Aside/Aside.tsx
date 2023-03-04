import React from 'react';

import { VideoCard, ProgramAbout, Recommendation } from './frames';

import { Program } from 'library/models/programs';
import { Mode } from 'library/types/programs';
import { ProgramVideo } from 'library/models/video';

import st from './Aside.module.scss';
import { useRecommendation } from 'library/hooks/programs';

type Props = {
	program: Program;
	mode: Mode;
	onAboutClick: (program: Program) => void;
	selectedId: number;
	onCommentClick: () => void;
	onVideoClick: (video: ProgramVideo) => void;
	programVideos: ProgramVideo[];
};

const Aside: React.FC<Props> = ({
	program,
	mode,
	selectedId,
	onAboutClick,
	onCommentClick,
	onVideoClick,
	programVideos,
}) => {
	const { recommendation } = useRecommendation();
	return (
		<section className={st.playlist__list}>
			<section className={st.playlist__about}>
				<ProgramAbout
					promoImage={program?.promo_image}
					author={program?.author}
					onClick={() => onAboutClick(program!)}
					isActive={
						program?.promo_video?.id
							? selectedId === program?.promo_video?.id && mode === 'video'
							: false
					}
				/>

				{recommendation && recommendation.programId === program.pk && (
					<Recommendation
						isActive={mode === 'comment'}
						onClick={onCommentClick}
						specialist={recommendation.coach}
					/>
				)}
			</section>

			{programVideos.map((video) => (
				<VideoCard
					key={video.id}
					video={video}
					onClick={onVideoClick}
					isActive={!!(selectedId && selectedId === video.id && mode === 'video')}
				/>
			))}
		</section>
	);
};

export default Aside;
