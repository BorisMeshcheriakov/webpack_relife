import React from 'react';
import { useAppSelector } from 'library/hooks/common';
import { selectProgram } from 'library/redux/programs';

import { ButtonDay } from './frames';

import { Program } from 'library/models/programs';
import { addDays, compareAsc, isToday, parseISO } from 'date-fns';

import st from './ChooseDay.module.scss';

type Props = {
	selectedDay: number;
	onSelect: (day: number) => void;
};

const ChooseDay: React.FC<Props> = ({ selectedDay, onSelect }) => {
	const program = useAppSelector(selectProgram);

	const generateDays = (program: Program | null) => {
		// Для оплаченной программы создаем количество дней, указанное в рекомендации
		if (!program) return 0;
		const { duration, individual, is_payed } = program;
		let days = duration;

		if (
			individual &&
			typeof individual.days_period === 'number' &&
			individual.days_period !== duration &&
			is_payed
		) {
			days = individual.days_period;
		}

		return days;
	};

	const days = Array.from({ length: generateDays(program) }, (x, i) => i + 1);

	const isProgramRented = (program: Program | null) => {
		if (!program || !program.is_payed || !program.individual) return false;
		if (!program.individual || !program.individual.start_date) return false;
		return true;
	};

	const today = (program: Program | null, dayValue: number) => {
		if (!isProgramRented(program)) return false;
		const date = addDays(parseISO(program!.individual?.start_date as string), dayValue - 1);
		return isToday(date);
	};

	const notPassed = (program: Program | null, dayValue: number) => {
		if (!isProgramRented(program)) return false;
		const date = addDays(parseISO(program!.individual?.start_date as string), dayValue - 1);
		return compareAsc(date, new Date()) === 1 ? true : false;
	};

	return (
		<div className={st.wrapper}>
			<div className={st.days}>
				{days.map((dayValue) => (
					<div key={dayValue}>
						<ButtonDay
							dayValue={dayValue}
							isToday={today(program, dayValue)}
							isSelected={selectedDay === dayValue}
							onClick={() => onSelect(dayValue)}
							notPassed={notPassed(program, dayValue)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChooseDay;
