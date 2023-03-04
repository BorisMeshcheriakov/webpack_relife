import { useRef } from 'react';
import cn from 'classnames';

import useUser from 'library/hooks/user/useUser';
import useOutsideClick from 'library/hooks/common/useOutsideClick';
import useMenulinks from 'library/hooks/header/useMenuLinks';

import Icon from 'library/components/header/Icon';

import st from './index.module.scss';

import person from 'resources/icons/header/person.svg';
import { Person } from 'shared/assets';

const Profile = () => {
	const links = useMenulinks();
	const { user } = useUser();

	const buttonRef = useRef(null);
	const listRef = useRef(null);

	const handleOusideClick = () => {
		links.setShowMenu(false);
	};

	useOutsideClick([buttonRef, listRef], handleOusideClick);

	const getUserName = () => {
		if (!user?.first_name && !user?.last_name && !user?.middle_name) {
			return user?.username;
		} else {
			return user?.last_name + ' ' + user?.first_name + ' ' + user?.middle_name;
		}
	};

	return (
		<div className={st.profile}>
			<button
				className={cn(st.profile__button, links.showMenu && st.active)}
				onClick={() => links.setShowMenu(true)}
				ref={buttonRef}
			>
				<Person />
			</button>

			{links.showMenu && (
				<div className={st.profile__menu} ref={listRef}>
					<button className={st.profile__user} onClick={() => links.handleButtonClick('/personal')}>
						<img src={user?.photo || person} alt="" className={st.profile__photo} />
						<span className={st.profile__name}>{getUserName()}</span>
					</button>

					{links.userModules.map((link) => (
						<button
							className={st.profile__item}
							key={link.code}
							onClick={() => links.handleButtonClick(link.code)}
						>
							<Icon icon={link.code} />
							<span className={st.profile__text}>{link.verbose_name}</span>
						</button>
					))}

					{links.staticLinks.map((link) => (
						<button className={st.profile__item} onClick={link.onClick} key={link.code}>
							<Icon icon={link.code} />
							<span className={st.profile__text}>{link.title}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Profile;
