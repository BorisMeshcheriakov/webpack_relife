import React from 'react';
import { useParams } from 'react-router-dom';
import { NormalizedConsultation } from 'library/types/schedules';

import { useConsultation } from 'library/hooks/schedules';

import { ModalLayout, Status } from 'library/components/schedules';
import {
	Nav,
	// Prepaid,
	Routes,
} from './frames';

import st from './ModalConsultation.module.scss';
import { ScheduleStatuses } from 'library/helpers/schedules';

type Props = {
	close: () => void;
};

const ModalConsultation: React.FC<Props> = ({ close }) => {
	const { scheduleId } = useParams<{ [x: string]: string }>();
	const { consultation, schedule, fields, connectMeeting } = useConsultation({ id: scheduleId });

	return (
		<ModalLayout
			title="Консультация"
			onSubmit={connectMeeting}
			close={close}
			submitTitle="Подключиться"
			showSubmit={consultation?.status === ScheduleStatuses.confirmed}
		>
			{schedule ? <Nav user={consultation?.user} consultation={schedule} /> : <></>}

			<div className={st.data__wrapper}>
				<div className={st.data}>
					{consultation && (
						<div className={st.row}>
							<div className={st.row__label}>Тип</div>
							<div className={st.row__value}>
								{consultation['mode' as keyof NormalizedConsultation]}
							</div>
						</div>
					)}

					{consultation && schedule && (
						<Status
							status={consultation.status}
							consultation={schedule}
							moveRequest={schedule?.schedule.changing_time_process}
						/>
					)}

					{consultation &&
						Object.keys(fields).map((row) => (
							<div key={row} className={st.row}>
								<div className={st.row__label}>{fields[row]}</div>
								<div className={st.row__value}>
									{consultation[row as keyof NormalizedConsultation]}
								</div>
							</div>
						))}

					{/* <Prepaid /> */}
				</div>
			</div>

			{schedule && <Routes consultation={schedule} />}
		</ModalLayout>
	);
};

export default ModalConsultation;
