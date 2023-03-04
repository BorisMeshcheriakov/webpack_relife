import React from 'react';

const useMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onItemClick = (action: () => void) => {
		action();
		handleClose();
	};

	return {
		anchorEl,
		open,
		handleClick,
		handleClose,
		onItemClick,
	};
};

export default useMenu;
