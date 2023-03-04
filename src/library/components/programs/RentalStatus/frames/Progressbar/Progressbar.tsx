import React from 'react';

import {
	// getDuration,
	getDaysLeft,
} from 'library/helpers/programs';

// import { CircularProgress } from '@mui/material';
import { Program, ProgramList } from 'library/models/programs';

import st from './Progressbar.module.scss';

type Props = {
	program: Program | ProgramList;
};

const Progressbar: React.FC<Props> = ({ program }) => {
	// const getProgress = (program: Program | ProgramList) => {
	// 	return getDaysLeft(program) / (getDuration(program) / 100);
	// };

	const handleProgressColor = (program: Program | ProgramList) => {
		let days = getDaysLeft(program);
		let color = '#55b183';

		if (days < 0) color = 'rgba(0, 0, 0, 0)';
		if (days >= 0 && days <= 7) color = '#f5a623'; // оранжевый
		if (days >= 8 && days <= 28) color = '#55b183'; // зеленый
		return color;
	};

	return (
		<div className={st.progress}>
			<span style={{ color: handleProgressColor(program) }}>Осталось дней</span>
			<div className={st.progress__bar}>
				{/* <CircularProgress
					variant="determinate"
					style={{
						color: handleProgressColor(program),
						boxShadow: 'inset 0 0 0px 1px #e8e8e8',
						width: 34,
						height: 34,
						borderRadius: '100%',
					}}
					value={getProgress(program)}
				/> */}
				<div className={st.progress__number} style={{ color: handleProgressColor(program) }}>
					{getDaysLeft(program)}
				</div>
			</div>
		</div>
	);
};

export default Progressbar;
