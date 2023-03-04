import React from 'react';
import { CoachAvailablePeriods, Consultation } from 'library/models/schedules';

import { ModalInvite } from './frames';
import { SummaryToolbar, Arrow, Block } from 'library/components/schedules';

import st from './Summary.module.scss';
import { Route, useRouteMatch } from 'react-router-dom';

type Props = {
	schedule: CoachAvailablePeriods | null;
	consultation: Consultation | null;
	close: () => void;
};

const Summary: React.FC<Props> = ({ schedule, consultation, close }) => {
	const { path } = useRouteMatch();

	return (
		<div className={st.summary}>
			{consultation && <SummaryToolbar consultation={consultation} />}

			<div className={st.summary__blocks}>
				{consultation && (
					<Block
						type={consultation.type}
						status={'confirmed'}
						start={consultation.start_time}
						end={consultation.end_time}
						price={consultation.cost.amount ?? 0}
						address={consultation.schedule.period.address}
					/>
				)}

				<div className={st.summary__arrow}>
					<Arrow />
				</div>

				{schedule && consultation && (
					<Block
						type={consultation.type}
						status={'confirmed'}
						start={schedule.start_time}
						end={schedule.end_time}
						price={schedule.price ?? 0}
						address={schedule.address}
					/>
				)}
			</div>
			{consultation && schedule && (
				<Route
					path={`${path}/invite-client`}
					render={() => (
						<ModalInvite close={close} consultation={consultation} schedule={schedule} />
					)}
				/>
			)}
		</div>
	);
};

export default Summary;
