import React from 'react';
import { useHistory } from 'react-router-dom';
import { Program } from 'library/models/programs';
import { Mode } from 'library/types/programs';

import { useModuleSettings } from 'library/hooks/module';

import { Card } from 'library/components/ui';
import { IconButtonGrey, ProgramMenu, ProgramModeration } from 'library/components/programs';

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';

import { useCommonSettings } from 'library/hooks/common';
import { useUser } from 'library/hooks/user';

import st from './Head.module.scss';

type Props = {
	program: Program;
	selectedDay: number;
	changeMode: (mode: Mode) => void;
	resetSelectedDay: () => void;
	onClose: () => void;
};

const Head: React.FC<Props> = ({ program, selectedDay, changeMode, resetSelectedDay, onClose }) => {
	const { user } = useUser();
	const { locationRoot } = useModuleSettings();
	const { push } = useHistory();

	const isAuthor = React.useCallback(() => {
		return user?.user?.id === program?.author?.id;
	}, [program?.author?.id, user?.user?.id]);

	const { moderation } = useCommonSettings();

	const openDaySelector = () => {
		changeMode('days');
		resetSelectedDay();

		// Скроллим на выбор дня
		const player = document.getElementById('video-anchor');
		player?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<Card className={st.toolbar}>
			<div className={st.toolbar__left}>
				<button className={st.toolbar__back} onClick={() => push(`/${locationRoot}`)}>
					<div className={st.toolbar__back_icon}>
						<ArrowBackIosNew fontSize="small" sx={{ transform: 'scale(0.8)' }} />
					</div>
					<span>Назад</span>
				</button>

				{/* <h2>{program?.title}</h2> */}
			</div>
			<div className={st.toolbar__right}>
				{isAuthor() && moderation && <ProgramModeration program={program} />}
				<div className={st.toolbar__buttons}>
					{program?.periodicity && (
						<div className={st.toolbar__day} onClick={openDaySelector}>
							<span>День</span>
							<IconButtonGrey sx={{ marginLeft: '10px' }}>
								<span style={{ fontSize: 14 }}>{selectedDay}</span>
							</IconButtonGrey>
						</div>
					)}

					<ProgramMenu program={program} onClose={onClose} />
				</div>
			</div>
		</Card>
	);
};

export default Head;
