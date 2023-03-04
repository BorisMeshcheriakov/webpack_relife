import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { ModalRecommend, ModalBuy, ModalShare } from 'library/components/programs';

const Routes: React.FC = () => {
	const { url, path } = useRouteMatch();
	const { push } = useHistory();

	return (
		<>
			<Route path={`${path}/buy/:id`} render={() => <ModalBuy close={() => push(`${url}`)} />} />
			<Route
				path={`${path}/recommend/:recommendId`}
				render={() => <ModalRecommend close={() => push(`${url}`)} />}
			/>
			<Route
				path={`${path}/share/:shareId`}
				render={() => <ModalShare close={() => push(`${url}`)} />}
			/>
		</>
	);
};

export default Routes;
