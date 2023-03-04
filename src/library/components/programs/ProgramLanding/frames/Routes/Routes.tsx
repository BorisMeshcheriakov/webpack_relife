import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { ModalProgramEditor, ModalRecommend } from 'library/components/programs';

const Routes = () => {
	const { url, path } = useRouteMatch();
	const { push } = useHistory();

	const onEditorClose = () => push(url);

	return (
		<Switch>
			<Route
				path={`${path}/recommend/:recommendId`}
				render={() => <ModalRecommend close={() => push(url)} />}
			/>
			<Route path={`${path}/edit`} render={() => <ModalProgramEditor close={onEditorClose} />} />
		</Switch>
	);
};

export default Routes;
