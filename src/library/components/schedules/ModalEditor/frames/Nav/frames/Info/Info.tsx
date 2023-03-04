import React from 'react';
import SVG from 'react-inlinesvg';
import { IconButton } from '@mui/material';

import { icons } from 'resources/icons/schedules';

const Info: React.FC = () => {
	// TODO сверстать кнопки без MUI
	const buttonStyle = {
		color: '#616f82',
		backgroundColor: '#f1f2f4',
		width: 34,
		height: 34,
		'&:hover': {
			color: '#fff',
			backgroundColor: '#4198c5',
			svg: {
				path: {
					fill: '#fff',
				},
			},
		},
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<IconButton sx={buttonStyle}>
				<SVG src={icons.info} />
			</IconButton>
		</div>
	);
};

export default Info;
