import { Loader } from 'library/components/common';
import {
	ButtonVisitors,
	EventDescription,
	EventEnd,
	EventModeration,
	Menu,
} from 'library/components/events';
import { Toolbar } from 'library/components/ui';
import { checkEventEnd } from 'library/helpers/events/dateSets';
import { useEvent, useModeration } from 'library/hooks/events';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import {
	Contacts,
	CustomBlocks,
	Place,
	Presenters,
	Price,
	TimeTable,
	Video,
	VisitorActions,
} from '../ModalEvent/frames';
import { icons } from 'resources/icons/events/index';

import st from './EventPage.module.scss';
import cn from 'classnames';

const EventPage = () => {
	const event = useEvent();
	const moderation = useModeration({ event: event?.event, isAuthor: event.isAuthor });
	return (
		<>
			{event.status === 'loaded' && event.event ? (
				<>
					<Toolbar styles={st.toolbar}>
						<section className={st.header}>
							<Link to="/events" className={st.header__back}>
								<SVG src={icons.back} />
							</Link>
							<div className={st.header__info}>
								<EventDescription event={event.event} size="large" type="type" />
								<EventDescription event={event.event} size="large" type="date" />
								<EventDescription event={event.event} size="large" type="time" />
								<EventDescription event={event.event} size="large" type="duration" />
							</div>

							<div className={st.header__moderation}>
								{checkEventEnd(event.event.time_to) && moderation.showModeration ? (
									<EventEnd size="large" />
								) : (
									<>
										{moderation.showModeration && (
											<EventModeration
												status={event.event.moderation_status.abbr_status}
												published={event.event.published}
												publicate={moderation.publicateEvent}
												showModerationStatus={moderation.showModerationStatus}
												showModerationText={moderation.showModerationText}
											/>
										)}
									</>
								)}
							</div>

							<div className={st.header__actions}>
								{event.isAuthor ? (
									<ButtonVisitors />
								) : (
									<VisitorActions
										availablePlaces={event.event.places}
										timeEnd={event.event.time_to}
									/>
								)}
							</div>

							<div className={st.header__menu}>
								<Menu event={event.event} className={st.menu} />
							</div>
						</section>
					</Toolbar>

					<section className={st.scrollable}>
						<div className={st.body}>
							<h1>{event.event.title}</h1>

							<div className={st.description}>
								<img src={event.event.event_image} alt="" />
								<p>{event.event.description}</p>
							</div>
							{event.event.presentation_video && (
								<div className={st.video}>
									<Video video={event.event.presentation_video} />
								</div>
							)}
							<div className={st.presenters}>
								{event.event.event_coach && event.event.event_coach.length > 0 && (
									<Presenters coach={event.event.event_coach} />
								)}
							</div>
							<div className={st.custom}>
								<CustomBlocks custom={event.event.event_block} />
							</div>

							<div className={cn(st.area)}>
								<TimeTable timeTables={event.event?.timetable} />
							</div>
							{event.event.places > 0 && event.event.mode === 'O' && (
								<div className={cn(st.area)}>
									<Place address={event.event.address} />
								</div>
							)}
							<div className={cn(st.area)}>
								<Price event={event.event} isAuthor={event.isAuthor} />
							</div>
							<div className={cn(st.area)}>
								<Contacts phone={event.event.phone} email={event.event.email} />
							</div>
						</div>
					</section>
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export default EventPage;
