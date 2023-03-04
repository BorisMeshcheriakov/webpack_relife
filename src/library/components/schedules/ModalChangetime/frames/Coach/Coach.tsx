import React from 'react';
import { useParams } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { CoachCard } from 'library/components/specialists';
import { useLoadSpecialist } from 'library/hooks/specialists';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';

type Props = {
	onClick: (
		start: Date,
		end: Date,
		schedule: CoachAvailablePeriods,
		busy?: OriginSchedule | undefined
	) => void;
};

const Coach: React.FC<Props> = ({ onClick }) => {
	let { id } = useParams<{ id: string }>();
	const { specialist } = useLoadSpecialist({ id });
	const onScheduleClick = (schedule: CoachAvailablePeriods) => {
		onClick(parseISO(schedule.start_time), parseISO(schedule.end_time), schedule);
	};

	return (
		<>{specialist && <CoachCard coach={specialist} onScheduleClick={onScheduleClick} inModal />}</>
	);
};

export default Coach;
