import React from 'react';
import cn from 'classnames';

import { Avatar } from '@mui/material';
// import { Telegram } from '@mui/icons-material';

import { getName } from 'library/helpers/user';

import st from './ClientItem.module.scss';

interface Props {
	client: any;
	isActive: boolean;
	isOpen: boolean;
}

const ClientItem: React.FC<Props> = ({ client, isActive, isOpen }) => {
	return (
		<div className={cn(st.item, isActive && st.active)}>
			<Avatar src={client.photo}>{client.last_name.slice(0, 1)}</Avatar>
			{isOpen && <div className={st.item__name}>{getName(client)}</div>}
			<div className={st.item__icon}>{/* <Telegram /> */}</div>
		</div>
	);
};

export default ClientItem;
