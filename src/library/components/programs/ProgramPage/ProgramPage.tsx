import React from 'react';
import { useParams } from 'react-router-dom';

import { useProgram } from 'library/hooks/programs';

import VideoProgram from '../VideoProgram';
import { Loader } from 'library/components/common';

import st from './ProgramPage.module.scss';

type Props = {
	close: () => void;
};

const ProgramPage: React.FC<Props> = ({ close }) => {
	const { id } = useParams<{ id: string }>();
	const program = useProgram(id);

	return (
		<div className={st.page}>
			{program.status === 'loading' && <Loader />}
			{program.program && program.status === 'idle' && (
				<VideoProgram
					program={program.program}
					selectedDay={program.day}
					onDaySelect={program.onDaySelect}
					programVideos={program.videos}
					resetSelectedDay={program.resetSelectedDay}
					onClose={close}
				/>
			)}
		</div>
	);
};

export default ProgramPage;
