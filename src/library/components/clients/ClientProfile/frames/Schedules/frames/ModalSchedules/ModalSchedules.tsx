import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { ModalLarge } from 'library/components/common';
import {
	Week,
	ModalConsultation,
	Toolbar,
	ModalEditor,
	ModalAssign,
} from 'library/components/schedules';

import st from './ModalSchedule.module.scss';
import { OriginSchedule } from 'library/models/schedules';

type Props = {
	close: () => void;
};

const ModalSchedules: React.FC<Props> = ({ close }) => {
	const { path, url } = useRouteMatch();
	const { push } = useHistory();

	const onClick = (start: Date, end: Date, consultation: any, busy?: OriginSchedule) => {
		if (consultation && !busy) {
			push(`${url}/consultation/open/${consultation.id}`);
		} else if (busy) {
			push(`${url}/consultation/busy/${busy.consultation_id}`);
		}
	};

	return (
		<ModalLarge isOpen title="Записать на консультацию" close={close}>
			<div className={st.wrap}>
				<Toolbar />

				<Switch>
					<Route
						exact
						path={path}
						render={() => <Week calendar="consultations" onClick={onClick} />}
					/>
					<Route
						path={`${path}/consultation/open/:scheduleId`}
						render={() => <ModalAssign close={() => push(url)} />}
					/>
					<Route
						path={`${path}/consultation/busy/:scheduleId`}
						render={() => <ModalConsultation close={() => push(url)} />}
					/>
					<Route path={`${path}/editor`} render={() => <ModalEditor close={() => push(url)} />} />
				</Switch>
			</div>
		</ModalLarge>
	);
};

export default ModalSchedules;
