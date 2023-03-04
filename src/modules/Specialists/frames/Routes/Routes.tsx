import { ModalCoach } from 'library/components/specialists';
import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

const Routes: React.FC = () => {
	const { push } = useHistory();
	return (
		<Switch>
			<Route
				path="/specialists/specialist/:id"
				render={() => <ModalCoach close={() => push('/specialists')} />}
			/>
		</Switch>
	);
};

export default Routes;
