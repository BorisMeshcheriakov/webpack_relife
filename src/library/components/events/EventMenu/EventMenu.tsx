import { Menu as MenuMui, MenuItem, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { FC } from 'react';

// @ts-ignore
import Pdf from 'react-to-pdf';

import st from './EventMenu.module.scss';
import cn from 'classnames';

interface Props {
	open: boolean;
	anchorEl: null | HTMLElement;
	targetRef: React.MutableRefObject<HTMLDivElement | null>;
	menuItems: {
		title: string;
		action: () => void;
	}[];
	handleClick: (event: React.MouseEvent<HTMLElement>) => void;
	handleClose: () => void;
}

const EventMenu: FC<Props> = ({
	open,
	handleClick,
	handleClose,
	anchorEl,
	menuItems,
	targetRef,
}) => {
	return (
		<>
			<IconButton
				id="menu-button"
				aria-controls={open ? 'event-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={cn(st.menu)}
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
				<Pdf
					targetRef={targetRef}
					filename="Билет.pdf"
					scale={0.9}
					options={{ orientation: 'landscape', unit: 'in', format: [11, 2] }}
				>
					{({ toPdf }: any) => (
						<MenuItem
							onClick={() => {
								toPdf();
								handleClose();
							}}
						>
							Скачать как PDF
						</MenuItem>
					)}
				</Pdf>

				{!!menuItems.length &&
					menuItems.map((menuItem) => (
						<MenuItem key={menuItem.title} onClick={menuItem.action}>
							{menuItem.title}
						</MenuItem>
					))}
			</MenuMui>
		</>
	);
};

export default EventMenu;
