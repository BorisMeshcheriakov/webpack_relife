import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { ModalConsultation } from 'library/components/schedules';
import ModalSchedules from '../ModalSchedules';

const Routes: React.FC = () => {
	const { path, url } = useRouteMatch();
	const { push } = useHistory();

	const onAssignClose = () => {
		push(url);
	};

	return (
		<Switch>
			<Route
				path={`${path}/assign-consultation`}
				render={() => <ModalSchedules close={() => onAssignClose()} />}
			/>
			<Route
				path={`${path}/consultation/:scheduleId`}
				render={() => <ModalConsultation close={() => push(url)} />}
			/>
		</Switch>
	);
};

export default Routes;
