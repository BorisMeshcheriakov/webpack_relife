import React from 'react';
import { useUpdateRecommendation, useVideoClick } from 'library/hooks/programs';
import { Program } from 'library/models/programs';

import { Main, Aside, Head, Routes } from './frames';

import { ProgramVideo } from 'library/models/video';
import ProgramLanding from '../ProgramLanding';

import st from './VideoProgram.module.scss';

type Props = {
	program: Program;
	selectedDay: number;
	onDaySelect: (day: number) => void;
	programVideos: ProgramVideo[];
	resetSelectedDay: () => void;
	onClose: () => void;
};

const VideoProgram: React.FC<Props> = ({
	program,
	selectedDay,
	onDaySelect,
	programVideos,
	resetSelectedDay,
	onClose,
}) => {
	const {
		mode,
		source,
		code,
		youtubeUrl,
		description,
		about,
		onAboutClick,
		selectedId,
		onCommentClick,
		onVideoClick,
		changeMode,
	} = useVideoClick();
	useUpdateRecommendation({ id: program.pk });
	return (
		<div className={st.program}>
			<Head
				program={program}
				selectedDay={selectedDay}
				changeMode={changeMode}
				resetSelectedDay={resetSelectedDay}
				onClose={onClose}
			/>

			<div className={st.scroller}>
				<ProgramLanding program={program} />

				<div className={st.program__content}>
					<div className={st.program__wrapper}>
						<Main
							mode={mode}
							source={source}
							code={code}
							youtubeUrl={youtubeUrl}
							program={program}
							selectedDay={selectedDay}
							onDaySelect={onDaySelect}
							description={description}
							about={about}
						/>

						<Aside
							program={program}
							mode={mode}
							onAboutClick={onAboutClick}
							selectedId={selectedId}
							onCommentClick={onCommentClick}
							onVideoClick={onVideoClick}
							programVideos={programVideos}
						/>
					</div>
				</div>
			</div>
			<Routes />
		</div>
	);
};

export default VideoProgram;
