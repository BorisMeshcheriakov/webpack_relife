import React from 'react';

import { ModalLarge } from 'library/components/common';
import {
	List,
	ModalRecommend as ModalProgramRecommend,
	Toolbar,
} from 'library/components/programs';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { useClient } from 'library/hooks/clients';

interface Props {
	section: string;
	close: () => void;
}

const ModalRecommend: React.FC<Props> = ({ section, close }) => {
	const { path, url } = useRouteMatch();
	const { push } = useHistory();
	const { client } = useClient();

	return (
		<ModalLarge title="Рекомендовать программу" isOpen onRequestClose={close} close={close}>
			<Toolbar section={section} />
			<List section={section} />
			<Route
				path={`${path}/recommend/:recommendId`}
				render={() => <ModalProgramRecommend close={() => push(url)} user={client?.user.id} />}
			/>
		</ModalLarge>
	);
};

export default ModalRecommend;
