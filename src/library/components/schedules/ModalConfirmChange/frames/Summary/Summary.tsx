import React from 'react';
import { Consultation, OriginSchedule } from 'library/models/schedules';

import { SummaryToolbar, Arrow, Block } from 'library/components/schedules';

import st from './Summary.module.scss';

type Props = {
	consultation: Consultation;
	old: OriginSchedule;
	newShedule: OriginSchedule;
};

const Summary: React.FC<Props> = ({ consultation, old, newShedule }) => {
	return (
		<div className={st.summary}>
			{consultation && <SummaryToolbar consultation={consultation} />}

			<div className={st.summary__blocks}>
				{old && (
					<Block
						type={old.type}
						status={'unconfirmed'}
						start={old.start_time}
						end={old.end_time}
						price={old.period.price ?? 0}
						address={old.period.address}
					/>
				)}

				<div className={st.summary__arrow}>
					<Arrow />
				</div>

				{newShedule && (
					<Block
						type={newShedule.type}
						status={'confirmed'}
						start={newShedule.start_time}
						end={newShedule.end_time}
						price={newShedule.period.price ?? 0}
						address={newShedule.address}
					/>
				)}
			</div>
			{/* {consultation && schedule && (
		<Route
			path={`${path}/invite-client`}
			render={() => (
				<ModalInvite close={close} consultation={consultation} schedule={schedule} />
			)}
		/>
	)} */}
		</div>
	);
};

export default Summary;
