import React from 'react';

import { useModuleSettings } from 'library/hooks/module';
import { useSection } from 'library/hooks/programs';

import { Container } from 'library/components/ui';
import {
	List,
	ModalProgramEditor,
	ModalRecommend,
	ModalShare,
	ProgramPage,
	Toolbar,
} from 'library/components/programs';
import { Subscribe } from './frames';

import st from './Programs.module.scss';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

const Programs: React.FC = () => {
	const { locationRoot } = useModuleSettings();

	const { url, path } = useRouteMatch();
	const { push } = useHistory();

	useSection();

	return (
		<Container>
			<div className={st.video}>
				<Switch>
					<Route
						path={`${path}/program/:id/edit`}
						render={() => <ModalProgramEditor close={() => push(url)} />}
					/>

					<Route
						path={`${path}/program/:id`}
						render={() => <ProgramPage close={() => push(url)} />}
					/>

					<Route path={`/${locationRoot}/subscribe/:pk/:code`}>
						<Subscribe />
					</Route>

					<Route path={path}>
						<Toolbar section={locationRoot} />

						<List section={locationRoot} />
					</Route>
				</Switch>

				<Route
					path={`${path}/recommend/:recommendId`}
					render={() => <ModalRecommend close={() => push(url)} />}
				/>

				<Route
					path={`${path}/share/:shareId`}
					render={() => <ModalShare close={() => push(`${url}`)} />}
				/>
			</div>
		</Container>
	);
};

export default Programs;
