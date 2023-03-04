import React from 'react';
import cn from 'classnames';

import st from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	dayValue: number;
	isToday: boolean;
	isSelected: boolean;
	notPassed: boolean;
}

const DayButton: React.FC<Props> = ({ dayValue, isToday, isSelected, notPassed, ...props }) => {
	return (
		<button className={cn(st.btn, notPassed && st.notPassed, isSelected && st.selected)} {...props}>
			{dayValue}
			{isToday && <span className={st.today}>сегодня</span>}
		</button>
	);
};

export default DayButton;
