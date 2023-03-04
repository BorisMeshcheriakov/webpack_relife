import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { ProgramCard, ModalRecommend } from './frames';

import { useClientPrograms } from 'library/hooks/clients';
import { ModalProgram, ModalProgramEditor } from 'library/components/programs';

import st from './Programs.module.scss';
import { useAppSelector } from 'library/hooks/common';
import { selectTab } from 'library/redux/clients';
import { Blank, Loader } from 'library/components/common';

const Programs: React.FC = () => {
	const tab = useAppSelector(selectTab);
	const { path, url } = useRouteMatch();
	const { push } = useHistory();
	const { getPrograms, programs, hasMore, status } = useClientPrograms({ section: tab });

	return (
		<div className={st.programs}>
			<InfiniteScroll
				className={st.programs__list}
				pageStart={0}
				loadMore={getPrograms}
				hasMore={hasMore}
			>
				{programs.map((program) =>
					program.program_data ? (
						<ProgramCard key={program.id} individual={program} />
					) : (
						<React.Fragment key={program.id}></React.Fragment>
					)
				)}
			</InfiniteScroll>

			{!programs.length && status === 'loading' && <Loader />}
			{!programs.length && status === 'idle' && <Blank text="Здесь пока нет программ" />}

			<Switch>
				<Route
					path={`${path}/recommend-program/program/:id`}
					render={() => <ModalProgram close={() => push(url)} />}
				/>
				<Route
					path={`${path}/recommend-program`}
					render={() => <ModalRecommend section={tab} close={() => push(url)} />}
				/>
				<Route
					path={`${path}/program/:id/edit`}
					render={() => <ModalProgramEditor close={() => push(url)} />}
				/>
				<Route
					path={`${path}/program/:id`}
					render={() => <ModalProgram close={() => push(url)} />}
				/>
			</Switch>
		</div>
	);
};

export default Programs;
