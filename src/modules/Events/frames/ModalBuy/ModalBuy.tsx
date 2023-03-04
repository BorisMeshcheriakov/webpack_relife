import { FC } from 'react';
import { useBuyTickets } from 'library/hooks/events';
import { useFieldArray, FormProvider } from 'react-hook-form';
import { Box, FormHelperText, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ModalLarge } from 'library/components/common';
import { PhoneControlled } from 'library/components/authentication/InputsControlled';
import { Tickets, Summary, ButtonPay, Terms, ButtonAddVisitor } from 'library/components/events';

import st from './ModalBuy.module.scss';

const ModalBuy: FC = () => {
	const buy = useBuyTickets();
	const {
		fields: ticketFields,
		append: appendTicket,
		remove: removeTicket,
	} = useFieldArray({
		name: 'ticket',
		control: buy.ticketForm.control,
	});

	return (
		<ModalLarge isOpen disableHeader onRequestClose={buy.onClose}>
			{buy.event.status === 'loaded' && buy.tickets.status === 'loaded' && (
				<>
					<FormProvider {...buy.ticketForm}>
						<form className={st.buy} onSubmit={buy.ticketForm.handleSubmit(buy.onSubmit)}>
							<section className={st.head}>
								<div className={st.head__info}></div>
								<div className={st.head__tickets}>
									<Tickets places={buy.event?.event?.places ?? 0} tickets={ticketFields.length} />
								</div>
								{buy.showCloseBtn && (
									<div className={st.head__close}>
										<IconButton type="button" className={st.head__close_btn} onClick={buy.onClose}>
											<Close />
										</IconButton>
									</div>
								)}

								{/* <Type type={event.event_type} />
				<EventDate date={event.time_from} />
				<Time time={event.time_from} />
				<Duration time_from={event.time_from} time_to={event.time_to} />
				<Tickets places={event.places} tickets={tickets.length} /> */}
							</section>

							<div className={st.participant}>
								<h3>Данные участника</h3>
								<div className={st.participant__wrapper}>
									{ticketFields.map((field, index) => (
										<div key={index} className={st.card}>
											<TextField
												type="text"
												size="small"
												label="Фамилия"
												error={
													!!(
														buy?.errors &&
														buy?.errors?.ticket &&
														buy?.errors?.ticket[index]?.last_name
													)
												}
												helperText={
													buy?.errors &&
													buy?.errors?.ticket &&
													buy?.errors?.ticket[index]?.last_name
														? buy?.errors?.ticket[index]?.last_name?.message
														: ' '
												}
												fullWidth
												{...buy.ticketForm.register(`ticket.${index}.last_name` as const)}
												InputLabelProps={{ shrink: true }}
											/>
											<TextField
												type="text"
												size="small"
												label="Имя"
												fullWidth
												error={
													!!(
														buy?.errors &&
														buy?.errors?.ticket &&
														buy?.errors?.ticket[index]?.first_name
													)
												}
												helperText={
													buy?.errors &&
													buy?.errors?.ticket &&
													buy?.errors?.ticket[index]?.first_name
														? buy?.errors?.ticket[index]?.first_name?.message
														: ' '
												}
												{...buy.ticketForm.register(`ticket.${index}.first_name` as const)}
												InputLabelProps={{ shrink: true }}
											/>

											<Box sx={{ width: '100%' }}>
												<PhoneControlled
													control={buy.ticketForm.control}
													label="Телефон"
													error={
														!!(
															buy?.errors &&
															buy?.errors?.ticket &&
															buy?.errors?.ticket[index]?.phone
														)
													}
													name={`ticket.${index}.phone` as const}
												/>
												<FormHelperText
													sx={{ marginLeft: '14px' }}
													error={
														!!(
															buy?.errors &&
															buy?.errors?.ticket &&
															buy?.errors?.ticket[index]?.phone
														)
													}
												>
													{buy?.errors && buy?.errors?.ticket && buy?.errors?.ticket[index]?.phone
														? buy?.errors?.ticket[index]?.phone?.message
														: ' '}
												</FormHelperText>
											</Box>

											{ticketFields.length > 1 && (
												<IconButton
													className={st.card__remove}
													type="button"
													onClick={() => removeTicket(index)}
												>
													<Close />
												</IconButton>
											)}
										</div>
									))}
								</div>
								<ButtonAddVisitor
									type="button"
									onClick={() =>
										appendTicket({ email: '', last_name: '', first_name: '', middle_name: ' ' })
									}
									disabled={(buy.event?.event?.places ?? 0) - buy.tickets.tickets.length === 0}
								/>
							</div>

							<section className={st.order}>
								<div className={st.checkout}>
									<Terms />
									<Summary
										tickets={buy.tickets.tickets.length}
										cost={buy.event?.event?.cost ?? 0}
										discounts={buy.event.event?.discount ?? []}
										prepayment={buy.event.event?.prepayment_cost ?? 0}
									/>
								</div>
								<ButtonPay type="submit" />
							</section>
						</form>
					</FormProvider>
				</>
			)}
		</ModalLarge>
	);
};

export default ModalBuy;
