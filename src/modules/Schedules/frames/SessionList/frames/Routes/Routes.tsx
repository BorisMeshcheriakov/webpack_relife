import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { ModalConsultation } from 'library/components/schedules';

const Routes: React.FC = () => {
	const { push } = useHistory();

	return (
		<Switch>
			<Route
				path="/schedules/:scheduleType/:scheduleId"
				render={() => <ModalConsultation close={() => push('/schedules')} />}
			/>
		</Switch>
	);
};

export default Routes;
