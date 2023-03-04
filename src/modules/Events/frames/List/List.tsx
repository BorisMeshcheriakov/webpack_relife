import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useEventList } from 'library/hooks/events';

import { EventCard } from 'library/components/events';
import { Blank, Loader } from 'library/components/common';

import st from './List.module.scss';

const List: React.FC = () => {
	const { list, status, hasNext, getEvents, search } = useEventList();

	return (
		<div className={st.list}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={0}
				hasMore={hasNext}
				loadMore={getEvents}
				useWindow={true}
				loader={list.length === 0 ? <Loader key={0} /> : undefined}
			>
				{list.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</InfiniteScroll>

			{status === 'idle' && !list.length && (
				<Blank
					text={search.length ? 'По Вашему запросу ничего не найдено' : 'Нет мероприятий'}
				></Blank>
			)}
		</div>
	);
};

export default List;
