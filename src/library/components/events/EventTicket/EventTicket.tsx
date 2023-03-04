import { FC } from 'react';
import { default as EventDescription } from '../EventDescription';
import { Event, TicketDetail } from 'library/models/events';
import { useEventMenu } from 'library/hooks/events';
import QRCode from 'qrcode.react';
import EventMenu from '../EventMenu';

import st from './EventTicket.module.scss';

interface Props {
	ticket: TicketDetail;
	event: Event | null;
}

const EventTicket: FC<Props> = ({ ticket, event }) => {
	const menu = useEventMenu();

	return (
		<>
			<div className={st.ticket} ref={menu.ref}>
				<div className={st.info}>
					<p className={st.title}>{ticket.event.title}</p>
					<div className={st.description}>
						<div className={st.description__block_1}>
							<EventDescription event={event} size="small" type="type" />
							<EventDescription event={event} size="small" type="date" />
							<EventDescription event={event} size="small" type="time" />
							<EventDescription event={event} size="small" type="duration" />
							<EventDescription event={event} size="small" type="cost" />
						</div>
						<div className={st.description__block_2}>
							<EventDescription event={event} size="small" type="place" />
							<EventDescription event={event} size="small" type="phone" />
						</div>
					</div>
				</div>
				<div className={st.qrcode}>
					{/* <div className={st.menu}>
						<EventMenu
							open={menu.open}
							anchorEl={menu.anchorEl}
							handleClick={menu.handleClick}
							handleClose={menu.handleClose}
							menuItems={menu.menuItems}
							targetRef={menu.ref}
						/>
					</div> */}
					<div className={st.qr}>
						<QRCode value={ticket.id} size={121} />
						<p className={st.name}>
							{ticket.last_name} {ticket.first_name}
						</p>
					</div>
					<div className={st.menu}>
						<EventMenu
							open={menu.open}
							anchorEl={menu.anchorEl}
							handleClick={menu.handleClick}
							handleClose={menu.handleClose}
							menuItems={menu.menuItems}
							targetRef={menu.ref}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventTicket;
