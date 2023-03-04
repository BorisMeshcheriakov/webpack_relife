import { FC } from 'react';
import { Event } from 'library/models/events';
import { EventPrice, JoinBtn, Tickets } from './frames';

import st from './Price.module.scss';

import { checkDate } from 'library/helpers/events/dateSets';

interface Props {
	event: Event;
	isAuthor: boolean;
}

const Price: FC<Props> = ({ event, isAuthor }) => {
	return (
		<div className={st.wrapper}>
			<p className={st.title}>Стоимость</p>
			<div className={st.priceWrapper}>
				<Tickets label={'Осталось мест'} value={event.places} />
				<div className={st.costWrapper}>
					{event.cost && <EventPrice cost={event.cost} discounts={event.discount} />}
					{!checkDate(event.time_to) && !isAuthor && event.places > 0 && <JoinBtn />}
				</div>
			</div>
		</div>
	);
};

export default Price;
