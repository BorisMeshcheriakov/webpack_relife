import React from 'react';

import { useVisitors } from 'library/hooks/events';
import { useParams } from 'react-router-dom';
import { VisitorCounter, Scanner } from 'library/components/events';
import { IconButton, TextField, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Close, QrCodeScanner, Search, Phone } from '@mui/icons-material';
import { ModalLarge, Blank, Loader } from 'library/components/common';

import st from './ModalVisitors.module.scss';

type Props = {};

const ModalVisitors: React.FC<Props> = (props: Props) => {
	const { id } = useParams<{ id: string }>();
	const visitors = useVisitors(id);

	return (
		<ModalLarge isOpen disableHeader onRequestClose={visitors.onClose}>
			<section className={st.head}>
				<div className={st.head__left}>
					<h2>Участники мероприятия</h2>
				</div>
				<div className={st.head__right}>
					<VisitorCounter text="Всего" number={visitors.totalVisitors} />
					<VisitorCounter text="Отмечено" number={visitors.used} />
				</div>
				{visitors.showCloseBtn && (
					<div className={st.head__close}>
						<IconButton onClick={visitors.onClose}>
							<Close />
						</IconButton>
					</div>
				)}
			</section>
			<section className={st.body}>
				<div className={st.body__search}>
					<TextField
						fullWidth
						placeholder="Поиск участников"
						className={st.body__input}
						value={visitors.search}
						onChange={visitors.handleSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton className={st.icon}>
										<Search />
									</IconButton>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									<IconButton className={st.icon} onClick={visitors.toggleScan}>
										<QrCodeScanner />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={st.body__list}>
					<div className={st.body__list_outer}>
						{visitors.tickets.length ? (
							visitors.tickets.map((ticket) => (
								<div className={st.visitor} key={ticket.id}>
									<div className={st.visitor__checkbox}>
										<FormControlLabel
											control={
												<Checkbox
													checked={ticket.used}
													onChange={(e, checked) => visitors.toggleTicket(e, checked, ticket.id)}
												/>
											}
											label={`${ticket.last_name ?? ''} ${ticket.first_name ?? ''}`}
										/>
									</div>
									{/* <div className={st.visitor__id}>{ticket.id}</div> */}
									<div className={st.visitor__phone}>
										{ticket.phone && (
											<>
												<Phone />
												<>{ticket.phone}</>
											</>
										)}
									</div>
								</div>
							))
						) : (
							<></>
						)}

						{visitors.status === 'loaded' && !visitors.tickets.length && (
							<Blank
								text={visitors.search ? 'Не найдено ни одного посетителя' : 'Нет посетителей'}
							/>
						)}

						{visitors.status === 'loading' && !visitors.tickets.length && (
							<Loader text="Загрузка билетов..." />
						)}

						<div ref={visitors.lastElement} style={{ height: '60px' }} />
					</div>
				</div>
			</section>
			<Scanner
				open={visitors.showScanner}
				close={visitors.toggleScan}
				handleScan={visitors.handleScan}
			/>
		</ModalLarge>
	);
};

export default ModalVisitors;
