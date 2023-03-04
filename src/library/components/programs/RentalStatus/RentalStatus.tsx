import React from 'react';
import { Program, ProgramList } from 'library/models/programs';
import { parseISO, compareAsc } from 'date-fns';

import { Progressbar } from './frames';

import st from './RentalStatus.module.scss';

type Props = {
	program: Program | ProgramList;
};

const RentalStatus: React.FC<Props> = ({ program }) => {
	const isInProcess = (program: Program | ProgramList) => {
		let inProcess: boolean = false;
		const { individual } = program;
		const { end_date } = individual || {};
		if (end_date) {
			let now = new Date();
			let end = parseISO(end_date);
			inProcess = compareAsc(now, end) === -1;
		}
		return inProcess;
	};

	return (
		<div>
			{isInProcess(program) ? (
				<Progressbar program={program} />
			) : (
				<span className={st.completed}>Прокат завершен</span>
			)}
		</div>
	);
};

export default RentalStatus;
