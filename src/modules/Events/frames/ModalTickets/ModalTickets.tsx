import { FC } from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Blank, Loader, ModalLarge } from 'library/components/common';
import { Counter, ButtonBuy, EventTicket } from 'library/components/events';
import { useEvent, useMyTickets } from 'library/hooks/events';

import st from './ModalTickets.module.scss';

type Props = {};

const ModalTickets: FC<Props> = (props: Props) => {
	const tickets = useMyTickets();
	const event = useEvent();

	return (
		<ModalLarge isOpen disableHeader onRequestClose={tickets.onClose}>
			{tickets.status === 'loading' && <Loader text="Загрузка билетов..." />}

			{event.status === 'loaded' && tickets.status === 'loaded' && (
				<div className={st.tickets}>
					<div className={st.head}>
						<div className={st.wrap}>
							<div className={st.head__info}>
								<Counter quantity={tickets.tickets.length} />
							</div>
							<div className={st.head__actions}>
								<ButtonBuy
									handler={tickets.onBuy}
									totalTickets={tickets.tickets.length}
									places={event.event?.places ?? 0}
								/>
							</div>
						</div>
						{tickets.showCloseBtn && (
							<div className={st.head__close}>
								<IconButton onClick={tickets.onClose} className={st.head__close_btn}>
									<Close />
								</IconButton>
							</div>
						)}
					</div>
					<div className={st.list}>
						{!tickets.tickets.length && <Blank text={'Не найдено ни одного билета'} />}

						<div className={st.wrapper}>
							{tickets.tickets.map((ticket) => (
								<EventTicket ticket={ticket} event={event.event} key={ticket.id} />
							))}
						</div>
					</div>
				</div>
			)}
		</ModalLarge>
	);
};

export default ModalTickets;
