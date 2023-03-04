import React from 'react';
import { useDateChange } from 'library/hooks/schedules';
import { Calendar } from 'library/types/schedules';

import st from './Navigation.module.scss';
import { IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

type Props = {
	calendar: Calendar;
};

const Navigation: React.FC<Props> = ({ calendar }) => {
	const { date, change } = useDateChange(calendar);

	// TODO сверстать кнопки без MUI
	const buttonStyle = {
		// border: '1px solid #616f82',
		color: '#616f82',
		backgroundColor: '#f1f2f4',
		width: 34,
		height: 34,
		'&:hover': {
			// border: '1px solid #4198c5',
			color: '#fff',
			backgroundColor: '#4198c5',
		},
	};

	const iconStyle = {
		transform: 'scale(0.8)',
	};

	return (
		<div className={st.navigation}>
			<button onClick={() => change(date, 'reset')}>Сегодня</button>
			<IconButton onClick={() => change(date, 'subtract')} sx={buttonStyle}>
				<ArrowBackIosNew fontSize="small" sx={iconStyle} />
			</IconButton>
			<IconButton onClick={() => change(date, 'add')} sx={buttonStyle}>
				<ArrowForwardIos fontSize="small" sx={iconStyle} />
			</IconButton>
		</div>
	);
};

export default Navigation;
