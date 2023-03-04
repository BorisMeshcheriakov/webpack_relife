import { useRef, useState } from 'react';

const useEventMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const ref = useRef<HTMLDivElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const getMenuItem = () => {
		return [
			// {
			// 	title: 'заголовок меню',
			// 	action: ф-ция ,
			// },
		];
	};

	return {
		open,
		ref,
		anchorEl,
		handleClick,
		handleClose,
		menuItems: getMenuItem(),
	};
};

export default useEventMenu;
