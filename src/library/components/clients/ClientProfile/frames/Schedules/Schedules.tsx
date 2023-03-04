import React from 'react';

import { List, Routes } from './frames';

import st from './Schedules.module.scss';

interface Props {
	id: number;
}

const Schedules: React.FC<Props> = ({ id }) => {
	return (
		<div className={st.schedules}>
			<List id={id} />

			<Routes />
		</div>
	);
};

export default Schedules;
