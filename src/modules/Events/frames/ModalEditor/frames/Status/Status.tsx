import React from 'react';

import { CircularProgress } from '@mui/material';

import st from './Status.module.scss';

type Props = {
	progress?: number;
};

const Status: React.FC<Props> = ({ progress }) => {
	return (
		<div className={st.status}>
			{progress && progress > 0 ? (
				<>
					<CircularProgress variant="determinate" value={progress} />
					<span>Загружаем видео...</span>
				</>
			) : (
				<>
					<CircularProgress />
				</>
			)}
		</div>
	);
};

export default Status;
