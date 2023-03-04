import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Blank, Loader } from 'library/components/common';
import Card from '../Card';

import { useLoadConsultations } from 'library/hooks/schedules';

import st from './List.module.scss';

type Props = {
	id: number;
};

const List: React.FC<Props> = ({ id }) => {
	const { getConsultations, consultations, status, hasNext } = useLoadConsultations({ user: id });

	return (
		<>
			<InfiniteScroll
				useWindow={false}
				className={st.scroller}
				loadMore={getConsultations}
				hasMore={hasNext}
			>
				<ul className={st.list}>
					{consultations.map((consultation) => (
						<Card key={consultation.id} consultation={consultation} />
					))}
				</ul>
			</InfiniteScroll>

			{consultations.length === 0 && status === 'idle' && (
				<Blank text="У Вас нет ни одной запланированной консультации" />
			)}

			{consultations.length === 0 && status === 'loading' && <Loader />}
		</>
	);
};

export default List;
