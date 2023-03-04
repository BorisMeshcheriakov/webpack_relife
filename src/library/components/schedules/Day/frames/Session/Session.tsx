import React from 'react';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { LoadStatus } from 'library/types/common';

import { useSession } from 'library/hooks/schedules';

import { Wrapper, Time, Data, Loader } from './frames';

type Props = {
	start: Date;
	end: Date;
	consultation?: CoachAvailablePeriods;
	busy?: OriginSchedule;
	loadStatus: LoadStatus;
	onClick: () => void;
};

const Session: React.FC<Props> = ({ start, end, consultation, busy, loadStatus, onClick }) => {
	const { part, overlap, status, isNow } = useSession(
		start,
		end,
		consultation,
		busy,
		false,
		'ON',
		'consultations'
	);

	return loadStatus === 'loading' ? (
		<Loader />
	) : (
		<Wrapper part={part} overlap={overlap} status={status} onClick={onClick} isNow={isNow}>
			<Time start={start} part={part} overlap={overlap} />
			<Data consultation={consultation} busy={busy} part={part} overlap={overlap} status={status} />
		</Wrapper>
	);
};

export default Session;
