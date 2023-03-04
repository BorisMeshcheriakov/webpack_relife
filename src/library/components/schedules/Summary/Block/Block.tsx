import React from 'react';
import cn from 'classnames';
import { format, formatDistanceStrict, parseISO } from 'date-fns';
import { addressString, modes } from 'library/helpers/schedules';
import ru from 'date-fns/locale/ru';

import st from './Block.module.scss';
import { ScheduleAddress } from 'library/models/schedules';

type Props = {
	type: string;
	status: string;
	start: string;
	end: string;
	price: number;
	address?: ScheduleAddress[] | null;
};

const Block: React.FC<Props> = ({ type, status, start, end, price, address }) => {
	const statuses: { [x: string]: string } = {
		unconfirmed: 'Не подтверждена',
		confirmed: 'Подтверждена',
	};

	return (
		<div className={st.block}>
			<div className={st.row}>
				<div className={st.row__label}>Тип</div>
				<div className={st.row__data}>{modes[type].editorTitle}</div>
			</div>
			<div className={st.row}>
				<div className={st.row__label}>Статус</div>
				<div className={cn(st.row__data, st[status])}>{statuses[status]}</div>
			</div>
			<div className={st.row}>
				<div className={st.row__label}>Дата</div>
				<div className={st.row__data}>
					{format(parseISO(start), 'dd MMMM yyyy', { locale: ru })}
				</div>
			</div>
			<div className={st.row}>
				<div className={st.row__label}>Время</div>
				<div className={st.row__data}>{format(parseISO(start), 'HH:mm')}</div>
			</div>
			<div className={st.row}>
				<div className={st.row__label}>Длительность</div>
				<div className={st.row__data}>
					{formatDistanceStrict(parseISO(start), parseISO(end), { locale: ru })}
				</div>
			</div>
			<div className={st.row}>
				<div className={st.row__label}>Стоимость</div>
				<div className={st.row__data}>{`${(price ?? 0) / 100} ₽`}</div>
			</div>

			{address && address.length > 0 && (
				<div className={st.row}>
					<div className={st.row__label}>Адрес</div>
					<div className={st.row__data}>{addressString(address[0])}</div>
				</div>
			)}
		</div>
	);
};

export default Block;
