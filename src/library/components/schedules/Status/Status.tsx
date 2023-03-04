import React from 'react';
import cn from 'classnames';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ScheduleStatuses } from 'library/helpers/schedules';

import { useModulePermissions } from 'library/hooks/module';

import st from './Status.module.scss';
import { Consultation, MoveRequest } from 'library/models/schedules';
import { useBuyConsultation, useMoveSpecialist } from 'library/hooks/schedules';

type Props = {
	status: ScheduleStatuses;
	consultation?: Consultation;
	moveRequest?: MoveRequest;
};

const Status: React.FC<Props> = ({ status, moveRequest, consultation }) => {
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const { can_sell } = useModulePermissions();
	const sellerMove = useMoveSpecialist();
	const { buyConsultation } = useBuyConsultation();

	const onPay = () => {
		if (can_sell) {
			push(`${url}/remind-pay`);
		} else {
			// TODO Оплата клиентом
			if (!consultation) return;
			buyConsultation(consultation);
		}
	};

	const onConfirm = () => {
		// TODO Действия, в зависимости от того, кто инициатор переноса
		if (!moveRequest || !moveRequest.schedule) return;

		if (
			(can_sell && moveRequest.initiator === 'C') ||
			(!can_sell && moveRequest.initiator === 'P')
		) {
			push(`${url}/remind-move`);
		}

		if (!can_sell && moveRequest.initiator === 'C') {
			// buyerMove.confirmMove(moveRequest.schedule);
			push(`${url}/confirm-change`);
		}

		if (can_sell && moveRequest.initiator === 'P') {
			sellerMove.confirmMove(moveRequest.schedule);
		}
	};

	const statuses: { [x: string]: string } = {
		cancelled: 'Отменена',
		unconfirmed: 'Не подтверждена',
		notPayed: 'Не оплачена',
		confirmed: 'Подтверждена',
		assign: 'Запись...',
		paymentAwaiting: 'Подтверждение оплаты...',
	};

	return (
		<div className={st.row}>
			<div className={st.row__label}>Статус</div>
			<div className={cn(st.row__value, st[status])}>{statuses[status]}</div>
			{status === ScheduleStatuses.notPayed && (
				<button className={st.confirm} onClick={onPay}>
					{can_sell ? 'Оповестить' : 'Оплатить'}
				</button>
			)}

			{status === ScheduleStatuses.unconfirmed && (
				<button className={st.confirm} onClick={onConfirm}>
					{can_sell ? 'Оповестить' : 'Подтвердить'}
				</button>
			)}
		</div>
	);
};

export default Status;
