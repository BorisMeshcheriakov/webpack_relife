import React from 'react';

import { CircularProgress } from '@mui/material';

import st from './UploadProgress.module.scss';

type Props = {
	progress?: number;
	title?: string;
};

const UploadProgress: React.FC<Props> = ({ progress, title }) => {
	return (
		<div className={st.status}>
			{progress && progress > 0 ? (
				<>
					<CircularProgress variant="determinate" value={progress} />
					<span>{title}</span>
				</>
			) : (
				<>
					<CircularProgress />
				</>
			)}
		</div>
	);
};

export default UploadProgress;
