import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useLoadConsultations } from 'library/hooks/schedules';

import { ConsultationCard } from 'library/components/schedules';

import st from './List.module.scss';
import { Blank, Loader } from 'library/components/common';

const List: React.FC = () => {
	const { getConsultations, consultations, status, hasNext } = useLoadConsultations();

	return (
		<div className={st.list}>
			<InfiniteScroll
				useWindow={false}
				className={st.scroller}
				loadMore={getConsultations}
				hasMore={hasNext}
			>
				{consultations.map((consultation) => (
					<ConsultationCard key={consultation.id} consultation={consultation} />
				))}
			</InfiniteScroll>

			{consultations.length === 0 && status === 'idle' && (
				<Blank text="У Вас нет ни одной запланированной консультации" />
			)}

			{consultations.length === 0 && status === 'loading' && <Loader />}
		</div>
	);
};

export default List;
