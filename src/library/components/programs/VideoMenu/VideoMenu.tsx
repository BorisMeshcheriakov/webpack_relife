import React from 'react';
import cn from 'classnames';

import { useVideoMenu } from 'library/hooks/programs';
import { ExerciseVideoList, ProgramVideo, SimplePromoVideo } from 'library/models/video';
import { MoreHoriz } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

import st from './VideoMenu.module.scss';
import IconButtonGrey from '../IconButtonGrey';

interface Props {
	video: ExerciseVideoList | ProgramVideo | SimplePromoVideo | null;
	videoType: string;
	size?: 'small';
}

const VideoMenu: React.FC<Props> = ({ video, videoType, size }) => {
	const { open, anchorEl, handleClick, handleClose, items } = useVideoMenu(video, videoType);
	return (
		<>
			<IconButtonGrey
				sx={{ width: 34, height: 34 }}
				id="menu-button"
				aria-controls={open ? 'program-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={cn(st.menu, size === 'small' && st.small)}
			>
				<MoreHoriz />
			</IconButtonGrey>
			<Menu
				id="video-menu"
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
			</Menu>
		</>
	);
};

export default VideoMenu;
