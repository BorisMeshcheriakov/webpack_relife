import React from 'react';

import { IconButton, Menu as MaterialMenu, MenuItem } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { MenuAction } from 'library/types/common';

type Props = {
	open: boolean;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClose: () => void;
	anchorEl: HTMLElement | null;
	actions: MenuAction;
};

const Menu: React.FC<Props> = ({ open, handleClick, handleClose, anchorEl, actions }) => {
	return (
		<>
			<IconButton
				sx={{ width: 34, height: 34, padding: 0 }}
				id="menu-button"
				aria-controls={open ? 'program-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MoreHoriz fontSize="small" />
			</IconButton>
			<MaterialMenu
				id="program-menu"
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
				{Object.keys(actions).map((item) => (
					<MenuItem key={actions[item].title} onClick={actions[item].action}>
						{actions[item].title}
					</MenuItem>
				))}
			</MaterialMenu>
		</>
	);
};

export default Menu;
