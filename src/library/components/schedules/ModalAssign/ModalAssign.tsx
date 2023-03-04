import React from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { NormalizedSchedule } from 'library/types/schedules';

import { useSchedule } from 'library/hooks/schedules';
import { useUser } from 'library/hooks/user';

import { ModalLayout, Status } from 'library/components/schedules';
import { Nav, Mode, ModalNotify } from './frames';

import st from './ModalAssign.module.scss';
import { useAppSelector } from 'library/hooks/common';
import { selectClient } from 'library/redux/clients';

type Props = {
	close: () => void;
};

const ModalAssign: React.FC<Props> = ({ close }) => {
	const { path } = useRouteMatch();
	const { user } = useUser();
	const selectedClient = useAppSelector(selectClient);

	const { scheduleId, clientId, coachId } = useParams<{ [x: string]: string }>();
	const { schedule, client, specialist, assign, fields, changeMode, selectedMode } = useSchedule({
		id: scheduleId,
		clientId: clientId ?? selectedClient?.id,
		specialistId: user?.is_client ? coachId : null,
		close: close,
	});

	const onSubmit = () => assign();

	return (
		<ModalLayout
			title="Консультация"
			onSubmit={onSubmit}
			close={close}
			showSubmit
			submitTitle="Записать"
		>
			<Nav user={client ?? specialist} />

			<div className={st.data__wrapper}>
				<div className={st.data}>
					{schedule && (
						<div className={st.row}>
							<div className={st.row__label}>Тип</div>
							<Mode mode={schedule.mode} selectedMode={selectedMode} changeMode={changeMode} />
						</div>
					)}
					{schedule && <Status status={schedule.status} />}

					{schedule &&
						Object.keys(fields).map((row) => (
							<div key={row} className={st.row}>
								<div className={st.row__label}>{fields[row]}</div>
								<div className={st.row__value}>{schedule[row as keyof NormalizedSchedule]}</div>
							</div>
						))}
				</div>
			</div>

			<Route path={`${path}/notify/:id`} render={() => <ModalNotify close={() => close()} />} />
		</ModalLayout>
	);
};

export default ModalAssign;
