import React from 'react';
import { NavLink } from 'react-router-dom';
// import { ButtonNotifications } from 'library/components/header';

import useMenulinks from 'library/hooks/header/useMenuLinks';
import useUser from 'library/hooks/user/useUser';

import ButtonLogin from 'library/components/header/ButtonLogin';
//import ButtonSupport from 'library/components/header/ButtonSupport';
import Profile from './frames/Profile';
import Logo from 'library/components/header/Logo';
//import ButtonCart from 'library/components/header/ButtonCart';

import st from './index.module.scss';
import cn from 'classnames';

const MenuDesktop = () => {
	const links = useMenulinks();
	const { isAuth } = useUser();

	return (
		<div className={st.wrapper}>
			<Logo />
			<div className={st.nav}>
				{links.modules &&
					links.modules.map((module) => {
						if (module.settings.type === 'video') {
							return (
								<NavLink
									key={module.code}
									className={st.nav__link}
									activeClassName={cn(st.nav__link, st.active)}
									to={`/${module.code}`}
									onClick={links.handleVideoClick}
								>
									{module.verbose_name}
								</NavLink>
							);
						}

						return (
							<NavLink
								key={module.code}
								strict
								to={`/${module.code}`}
								className={st.nav__link}
								activeClassName={cn(st.nav__link, st.active)}
							>
								{module.verbose_name}
							</NavLink>
						);
					})}
			</div>
			<div className={st.menu}>
				{/* {isAuth && <ButtonNotifications />} */}
				{/* <ButtonSupport /> */}
				{/* {isAuth && links.showCart && <ButtonCart />} */}
				{isAuth ? <Profile /> : <ButtonLogin />}
			</div>
		</div>
	);
};

export default MenuDesktop;
