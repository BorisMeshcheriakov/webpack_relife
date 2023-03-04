import React from 'react';

import { Container } from 'library/components/ui';
import { Toolbar } from 'library/components/schedules';
import { Routes } from './frames';

import st from './Calendar.module.scss';

const Calendar: React.FC = () => {
	return (
		<Container>
			<div className={st.calendar}>
				<Toolbar />
				<Routes />
			</div>
		</Container>
	);
};

export default Calendar;
