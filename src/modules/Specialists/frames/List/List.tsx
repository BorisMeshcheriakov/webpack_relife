import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useSpecialistSession, useSpecialistList } from 'library/hooks/specialists';

import { CoachCard } from 'library/components/specialists';
import { Blank, Loader } from 'library/components/common';

import st from './List.module.scss';

const List: React.FC = () => {
	const { getSpecialists, list, hasMore, search } = useSpecialistList();
	const { schedule, onScheduleClick } = useSpecialistSession();

	return (
		<div className={st.list}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={0}
				hasMore={hasMore}
				loadMore={getSpecialists}
				useWindow={false}
				loader={list.length === 0 ? <Loader key={0} /> : undefined}
			>
				{list.map((coach) => (
					<div className={st.wrapper} key={coach.id}>
						<CoachCard
							key={coach.id}
							coach={coach}
							onScheduleClick={onScheduleClick}
							schedule={schedule}
						/>
					</div>
				))}

				{!hasMore && !list.length && (
					<Blank
						text={search ? 'По вашему запросу ничего не найдено' : 'В этом списке нет специалистов'}
					/>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default List;
