import React from 'react';
import cn from 'classnames';

import { Event } from 'library/models/events';

import { Menu as MenuMui, MenuItem, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import { useMenu } from 'library/hooks/events';

import st from './Menu.module.scss';

interface Props {
	event: Event;
	className?: string;
}

const Menu: React.FC<Props> = ({ event, className }) => {
	const { open, handleClick, handleClose, anchorEl, items } = useMenu({ event });

	return (
		<>
			<IconButton
				id="menu-button"
				aria-controls={open ? 'event-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={cn(st.menu, className)}
			>
				<MoreHoriz />
			</IconButton>
			<MenuMui
				id="event-menu"
				anchorEl={anchorEl}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}
			>
				{items.map((item) => (
					<MenuItem key={item.title} onClick={item.action}>
						{item.title}
					</MenuItem>
				))}
			</MenuMui>
		</>
	);
};

export default Menu;
