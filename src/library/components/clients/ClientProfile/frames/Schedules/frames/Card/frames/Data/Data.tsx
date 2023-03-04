import { format, parseISO } from 'date-fns';
import { modes } from 'library/helpers/schedules';
import { ModeCode } from 'library/types/schedules';
import React from 'react';

import st from './Data.module.scss';

type Props = {
	type: ModeCode;
	start: string;
	end: string;
};

const Data: React.FC<Props> = ({ type, start, end }) => {
	return (
		<div className={st.data}>
			<h4>{modes[type].settingsTitle}</h4>
			<p>
				<span>{format(parseISO(start), 'dd.MM.yyyy')}</span>
				<span>, </span>
				<span>{format(parseISO(start), 'HH:mm')}</span>
				<span> - </span>
				<span>{format(parseISO(end), 'HH:mm')}</span>
			</p>
		</div>
	);
};

export default Data;
