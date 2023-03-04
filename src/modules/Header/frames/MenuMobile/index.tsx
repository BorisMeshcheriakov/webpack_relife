import React from 'react';
import useMenulinks from 'library/hooks/header/useMenuLinks';
import useUser from 'library/hooks/user/useUser';

import ButtonLogin from 'library/components/header/ButtonLogin';
import ButtonSupport from 'library/components/header/ButtonSupport';
import Icon from 'library/components/header/Icon';
import Logo from 'library/components/header/Logo';
import ButtonCart from 'library/components/header/ButtonCart';
import BurgerButton from './frames/BurgerButton';

import { ButtonNotifications } from 'library/components/header';

import st from './index.module.scss';

const MenuMobile = () => {
	const links = useMenulinks();
	const { isAuth, user } = useUser();

	return (
		<>
			<div className={st.wrapper}>
				<div className={st.wrapper__menu}>
					<BurgerButton active={links.showMenu} onClick={links.toggleMenu} />
				</div>
				<div className={st.wrapper__logo}>
					<Logo />
				</div>
				<div className={st.wrapper__buttons}>
					{isAuth && (
						<div className={st.btn}>
							<ButtonNotifications />
						</div>
					)}

					<ButtonSupport />

					{isAuth && links.showCart && <ButtonCart hideMenu={links.hideMenu} />}
					{!isAuth && <ButtonLogin />}
				</div>
			</div>
			{links.showMenu && (
				<div className={st.list}>
					<ul className={st.modules}>
						{links.userModules.map((link) => (
							<li
								className={st.modules__link}
								key={link.code}
								onClick={() => links.handleButtonClick(link.code)}
							>
								<Icon icon={link.settings.type} />
								<span className={st.modules__text}>{link.verbose_name}</span>
							</li>
						))}

						{links.modules &&
							links.modules.map((module) => {
								return (
									<li
										key={module.code}
										onClick={() => links.handleButtonClick(`/${module.code}`)}
										className={st.modules__link}
									>
										<Icon icon={module.settings.type} />
										<span className={st.modules__text}>{module.verbose_name}</span>
									</li>
								);
							})}
					</ul>
					<ul className={st.modules}>
						{isAuth && (
							<>
								{user?.is_coach && (
									<li
										className={st.modules__link}
										onClick={() => links.handleButtonClick(`/statistics`)}
									>
										<Icon icon={'statistics'} />
										<span className={st.modules__text}>Статистика</span>
									</li>
								)}
								{links.staticLinks.map((link) => (
									<li className={st.modules__link} onClick={link.onClick} key={link.code}>
										<Icon icon={link.code} />
										<span className={st.modules__text}>{link.title}</span>
									</li>
								))}
							</>
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default MenuMobile;
