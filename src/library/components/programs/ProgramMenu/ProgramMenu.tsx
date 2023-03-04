import React from 'react';
import cn from 'classnames';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { Program, ProgramList } from 'library/models/programs';

import { useProgramMenu } from 'library/hooks/programs';

import st from './ProgramMenu.module.scss';

type Props = {
	program: Program | ProgramList | null;
	onClose?: () => void;
	className?: string;
};

const ProgramMenu: React.FC<Props> = ({ program, onClose, className }) => {
	const { open, anchorEl, handleClick, handleClose, items } = useProgramMenu(program, onClose);
	return (
		<>
			<IconButton
				sx={{ width: 34, height: 34 }}
				id="menu-button"
				aria-controls={open ? 'program-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={cn(st.menu, className)}
			>
				<MoreHoriz fontSize="small" />
			</IconButton>
			<Menu
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
				{items.map((item) => (
					<MenuItem key={item.title} onClick={item.action} sx={{ fontSize: '14px' }}>
						{item.title}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default ProgramMenu;
