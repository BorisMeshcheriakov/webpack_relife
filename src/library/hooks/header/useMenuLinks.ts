import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';

import { selectModules } from 'library/redux/common';
import { openOutModal } from 'library/redux/modal';
import { setSelectedTab } from 'library/redux/programs';

const useMenuLinks = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const staticLinks = [
		{
			link: '/personal',
			title: 'Профиль',
			code: 'profile',
			onClick: () => handleButtonClick('/personal'),
		},
		{
			link: '',
			title: 'Выход',
			code: 'exit',
			onClick: () => handleLogout(),
		},
	];

	const dispatch = useAppDispatch();
	const modules = useAppSelector(selectModules);
	const { push } = useHistory();

	// модули главного меню
	const sortedModules = modules
		?.filter((module) => module.settings.menu === 'main')
		.sort((a, b) => a.settings.order - b.settings.order);

	// модули дополнительного меню
	const userModules = modules
		?.filter((module) => module.settings.menu === 'user')
		.sort((a, b) => a.settings.order - b.settings.order);

	const handleButtonClick = (link: string) => {
		setShowMenu(false);
		push(link);
	};

	const hideMenu = () => {
		setShowMenu(false);
	};

	const toggleMenu = () => {
		setShowMenu((show) => !show);
	};

	const handleLogout = () => {
		setShowMenu(false);
		dispatch(openOutModal());
	};

	const handleVideoClick = () => {
		dispatch(setSelectedTab('Все'));
	};

	const showCart = () => {
		return modules.find((module) => module.code === 'store');
	};

	return {
		modules: sortedModules,
		userModules: userModules ? userModules : [],
		showMenu,
		handleButtonClick,
		hideMenu,
		toggleMenu,
		handleLogout,
		staticLinks,
		setShowMenu,
		handleVideoClick,
		showCart: showCart(),
	};
};

export default useMenuLinks;
