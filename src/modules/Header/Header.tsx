import React from 'react';
import useHeaderMenu from 'library/hooks/header/useHeaderMenu';

import MenuDesktop from './frames/MenuDesktop';
import MenuMobile from './frames/MenuMobile';

import st from './Header.module.scss';

const Header: React.FC = () => {
	const { showMobile } = useHeaderMenu();

	return <header className={st.header}>{showMobile ? <MenuMobile /> : <MenuDesktop />}</header>;
};

export default Header;
