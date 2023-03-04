import React from 'react';

import { ModalLarge } from 'library/components/common';
import { Consultation } from 'library/models/schedules';

import { Head, Summary } from './frames';
import { useChangeTime, useMoveBuyer } from 'library/hooks/schedules';

import st from './ModalConfirmChange.module.scss';

type Props = {
	consultation: Consultation;
	close: () => void;
};

const ModalConfirmChange: React.FC<Props> = ({ consultation, close }) => {
	const id = consultation.schedule.changing_time_process.schedule!;

	const { confirmMove } = useMoveBuyer();
	const { request } = useChangeTime({ requestId: id });

	return (
		<ModalLarge isOpen disableHeader>
			<Head move={() => confirmMove(id)} close={close} />
			<div className={st.wrap}>
				{request && (
					<Summary
						consultation={consultation}
						newShedule={request.new_schedule}
						old={request.origin_schedule}
					/>
				)}
			</div>
		</ModalLarge>
	);
};

export default ModalConfirmChange;
