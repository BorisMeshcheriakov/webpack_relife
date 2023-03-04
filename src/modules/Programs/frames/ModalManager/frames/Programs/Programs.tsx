import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useMyProgramList } from 'library/hooks/programs';

import { ProgramCard } from 'library/components/programs';
import { Blank, Loader } from 'library/components/common';

import st from './Programs.module.scss';

const Programs: React.FC = () => {
	const { programs, hasMore, getPrograms, search, tags } = useMyProgramList();

	return (
		<div className={st.programs}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={0}
				hasMore={hasMore}
				loadMore={getPrograms}
				useWindow={false}
				loader={<Loader key={0} />}
			>
				{programs.map((program) => (
					<ProgramCard key={program.pk} program={program} />
				))}

				{!hasMore && !programs.length && (
					<Blank
						text={
							search || tags.length
								? 'По вашему запросу ничего не найдено'
								: 'В этом списке нет программ'
						}
					/>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default Programs;
