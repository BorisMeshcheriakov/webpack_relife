import React from 'react';
import { useHover, useSession } from 'library/hooks/schedules';
import { Calendar, ModeCode } from 'library/types/schedules';
import { CoachAvailablePeriods, OriginSchedule } from 'library/models/schedules';
import { LoadStatus } from 'library/types/common';

import { Border, Time, Data, Loader } from './frames';

import st from './Session.module.scss';

type Props = {
	start: Date;
	end: Date;
	calendar: Calendar;
	canUpdate: boolean;
	mode: ModeCode;
	consultation?: CoachAvailablePeriods;
	busy?: OriginSchedule;
	loadStatus: LoadStatus;
	onClick: () => void;
};

const Session: React.FC<Props> = ({
	start,
	end,
	calendar,
	canUpdate,
	consultation,
	busy,
	mode,
	loadStatus,
	onClick,
}) => {
	const { mock, status, part, overlap, isActive, isNow } = useSession(
		start,
		end,
		consultation,
		busy,
		canUpdate,
		mode,
		calendar
	);

	const { onEnter, onLeave } = useHover(start, end, consultation, busy, calendar);

	return loadStatus === 'loading' ? (
		<Loader />
	) : (
		<Border
			onClick={onClick}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			status={status}
			part={part}
			overlap={overlap}
			isActive={isActive}
			isNow={isNow}
		>
			{(part === 'top' || part === 'single') && (
				<div className={st.session}>
					<div className={st.session__time}>
						<Time start={start} status={status} />
					</div>
					<div className={st.session__icon}>
						<Data
							calendar={calendar}
							status={status}
							mode={mode}
							busy={busy}
							consultation={consultation}
							mock={mock}
						/>
					</div>
				</div>
			)}
		</Border>
	);
};

export default Session;
