import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Event } from 'library/models/events';
import { useModulePermissions } from 'library/hooks/module';
import { useModeration } from 'library/hooks/events';
import { Menu, EventDescription, EventModeration, EventEnd } from 'library/components/events';
import { getInitial } from 'library/helpers/user';
import { checkEventEnd } from 'library/helpers/events/dateSets';

import cn from 'classnames';
import st from './EventCard.module.scss';

interface Props {
	event: Event;
}

const EventCard: FC<Props> = ({ event }) => {
	const { can_sell } = useModulePermissions();
	const moderation = useModeration({ event });

	return (
		<div className={cn(st.card, st[moderation.getModerationClass()])}>
			<Link to={`/events/${event.id}`} className={st.image}>
				<img src={event.event_image} alt="" />
			</Link>
			<div className={st.data}>
				<section className={st.data__top}>
					<Link to={`/events/${event.id}`} className={st.data__title}>
						<h3>{event.title}</h3>
						<p>
							{getInitial(
								event.author.first_name,
								event.author.middle_name,
								event.author.last_name
							)}
						</p>
					</Link>
					<div className={st.data__menu}>
						<Menu event={event} />
					</div>
				</section>
				<section className={st.data__bottom}>
					<Link to={`/events/${event.id}`} className={st.data__details}>
						<div className={st.data__description}>
							<EventDescription event={event} size="small" type="date" />
							<EventDescription event={event} size="small" type="time" />
							<EventDescription event={event} size="small" type="typeMeeting" />
							<EventDescription event={event} size="small" type="cost" />
						</div>
					</Link>

					{moderation.getModerationClass() !== '' && (
						<>
							<div className={st.data__moderation}>
								{checkEventEnd(event.time_to) ? (
									<EventEnd size="small" />
								) : (
									<>
										{can_sell && moderation.showModeration && (
											<EventModeration
												status={event.moderation_status.abbr_status}
												published={event.published}
												publicate={moderation.publicateEvent}
												showModerationStatus={moderation.showModerationStatus}
												showModerationText={moderation.showModerationText}
											/>
										)}
									</>
								)}
							</div>
						</>
					)}
				</section>
			</div>
		</div>
	);
};

export default EventCard;
