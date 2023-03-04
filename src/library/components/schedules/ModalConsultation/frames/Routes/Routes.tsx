import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import ModalChangetime from 'library/components/schedules/ModalChangetime';
import ModalConfirmChange from 'library/components/schedules/ModalConfirmChange';
import { Consultation } from 'library/models/schedules';
import ModalRemind from '../ModalRemind';
import ModalRemindMove from '../ModalRemindMove';
import ModalSuggest from '../ModalSuggest';
import { useAppDispatch } from 'library/hooks/common';
import { setMode } from 'library/redux/specialists';

type Props = {
	consultation: Consultation;
};

const Routes: React.FC<Props> = ({ consultation }) => {
	const dispatch = useAppDispatch();
	const { path, url } = useRouteMatch();
	const { push } = useHistory();

	const close = () => push(url);

	const closeChangeTime = () => {
		push(url);
		dispatch(setMode('ON'));
	};

	return (
		<Switch>
			<Route
				path={`${path}/remind-pay`}
				render={() => <ModalRemind close={close} id={consultation.id} />}
			/>
			<Route
				path={`${path}/remind-move`}
				render={() => <ModalRemindMove close={close} consultation={consultation} />}
			/>
			<Route
				path={`${path}/suggest-change`}
				render={() => <ModalSuggest close={close} consultation={consultation} />}
			/>
			<Route
				path={`${path}/confirm-change`}
				render={() => <ModalConfirmChange close={close} consultation={consultation} />}
			/>
			<Route
				path={`${path}/change-time`}
				render={() => <ModalChangetime close={closeChangeTime} />}
			/>
			<Route
				path={`${path}/change-time-coach/:id`}
				render={() => <ModalChangetime close={close} />}
			/>
		</Switch>
	);
};

export default Routes;
