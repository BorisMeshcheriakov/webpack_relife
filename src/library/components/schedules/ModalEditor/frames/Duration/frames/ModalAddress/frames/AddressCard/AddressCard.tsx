import { FC, memo } from 'react';
import { ScheduleAddress } from 'library/models/schedules';
import { IconButton, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import { validAddress } from 'library/helpers/schedules';
import { getPhoneNumber } from 'library/helpers/events/normalizeEventValue';
import { icons } from 'resources/icons/schedules/index';
import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './AddressCard.module.scss';

interface Props {
	address: ScheduleAddress;
	index: number;
	isDisabled: boolean;
	handler: (id: number) => void;
}

const AddressCard: FC<Props> = ({ address, index, isDisabled, handler }) => {
	const matches = useMediaQuery('(min-width:600px)');
	return (
		<div className={st.card}>
			<div className={cn(st.icon, st.house)}>
				<SVG src={icons.home} />
				<p>{index + 1}</p>
			</div>
			<div className={st.info}>
				<p className={st.address}>{`Адрес: ${validAddress(address)}`}</p>
				<p className={st.phone}>
					{`Телефон:`}
					{!matches ? <br /> : ' '}
					<span>{getPhoneNumber(address.phone)}</span>
				</p>
				<p className={st.note}>{`Комментарий для клиента: ${address.note}`}</p>
			</div>
			<div className={st.icon}>
				<IconButton
					className={st.close}
					type="button"
					disabled={isDisabled}
					onClick={() => {
						handler(address.id);
					}}
				>
					<Close />
				</IconButton>
			</div>
		</div>
	);
};

export default memo(AddressCard);
