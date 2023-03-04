import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { ModalLarge } from 'library/components/common';
import { EventDescription, EventEnd, EventModeration, Menu } from 'library/components/events';
import {
	Price,
	Place,
	Presenters,
	Contacts,
	Video,
	CustomBlocks,
	VisitorActions,
	TimeTable,
} from './frames';
import { ButtonVisitors } from 'library/components/events';
import { Loader } from 'library/components/common';
import { useEvent, useModeration } from 'library/hooks/events';
import { checkEventEnd } from 'library/helpers/events/dateSets';

import cn from 'classnames';
import st from './ModalEvent.module.scss';

const ModalEvent: FC = () => {
	const event = useEvent();
	const moderation = useModeration({ event: event?.event, isAuthor: event.isAuthor });

	return (
		<ModalLarge isOpen disableHeader>
			{event.status === 'loaded' && event.event ? (
				<div className={st.wrapper}>
					<section className={st.header}>
						<div className={st.header__info}>
							<EventDescription event={event.event} size="large" type="date" />
							<EventDescription event={event.event} size="large" type="time" />
							<EventDescription event={event.event} size="large" type="type" />
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
						<div className={st.header__close}>
							<Link to="/events">
								<IconButton className={st.header__close_btn}>
									<Close />
								</IconButton>
							</Link>
						</div>
					</section>
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

							<div className={cn(st.area, st.area_blue)}>
								<TimeTable timeTables={event.event?.timetable} />
							</div>
							{event.event.places > 0 && event.event.mode === 'O' && (
								<div className={cn(st.area, st.area_white)}>
									<Place address={event.event.address} />
								</div>
							)}
							<div className={cn(st.area, st.area_blue)}>
								<Price event={event.event} isAuthor={event.isAuthor} />
							</div>
							<div className={cn(st.area, st.area_white)}>
								<Contacts phone={event.event.phone} email={event.event.email} />
							</div>
						</div>
					</section>
				</div>
			) : (
				<Loader />
			)}
		</ModalLarge>
	);
};

export default ModalEvent;
