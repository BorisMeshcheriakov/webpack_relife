import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useProgramList } from 'library/hooks/programs';

import { ProgramCard } from 'library/components/programs';
import { Blank, Loader } from 'library/components/common';

import st from './List.module.scss';

interface Props {
	section: string;
}

const List: React.FC<Props> = ({ section }) => {
	const { programs, hasMore, getPrograms, search, tags } = useProgramList({
		section: section,
	});

	return (
		<>
			<section className={st.list}>
				<InfiniteScroll
					className={st.scroller}
					pageStart={0}
					hasMore={hasMore}
					loadMore={getPrograms}
					useWindow={false}
					loader={programs.length === 0 ? <Loader key={0} /> : undefined}
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
			</section>
		</>
	);
};

export default List;
