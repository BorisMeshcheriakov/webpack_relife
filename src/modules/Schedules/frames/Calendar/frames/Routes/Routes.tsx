import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { ModalConsultation, ModalEditor, CalendarSwitcher } from 'library/components/schedules';

const Routes: React.FC = () => {
	const { push } = useHistory();
	const { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path="/schedules" render={() => <CalendarSwitcher />} />
			<Route
				path="/schedules/consultation/:scheduleType/:scheduleId"
				render={() => <ModalConsultation close={() => push('/schedules')} />}
			/>
			<Route path={`${path}/editor`} render={() => <ModalEditor close={() => push(url)} />} />
		</Switch>
	);
};

export default Routes;
