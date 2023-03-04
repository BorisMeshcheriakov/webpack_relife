import React from 'react';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useMenu } from 'library/hooks/common';

type Props = {
	buttonId: string;
	menuId: string;
	items: {
		title: string;
		action: () => void;
	}[];
};

const MenuBase: React.FC<Props> = ({ buttonId, menuId, items }) => {
	const { anchorEl, open, handleClick, handleClose, onItemClick } = useMenu();

	return (
		<>
			{items.length > 0 ? (
				<IconButton
					sx={{ width: 40, height: 40 }}
					id={buttonId}
					aria-controls={open ? menuId : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<MoreHoriz />
				</IconButton>
			) : null}

			<Menu
				id={menuId}
				anchorEl={anchorEl}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': buttonId,
				}}
			>
				{items.map((item) => (
					<MenuItem key={item.title} onClick={() => onItemClick(item.action)}>
						{item.title}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default MenuBase;
