import React from 'react';
// import SVG from 'react-inlinesvg';
import cn from 'classnames';

// import calendar from './resources/calendar.svg';

import st from './ButtonCalendar.module.scss';
import { CalendarToday } from '@mui/icons-material';

type Props = {
	handler: () => void;
	isActive: boolean;
};

const ButtonCalendar: React.FC<Props> = ({ handler, isActive }) => {
	return (
		<button className={cn(st.button, isActive && st.active)} onClick={handler}>
			{/* <SVG className={st.icon} src={calendar} /> */}
			<CalendarToday />
		</button>
	);
};

export default ButtonCalendar;
