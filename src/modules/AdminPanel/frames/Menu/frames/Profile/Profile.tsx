import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'library/hooks/common';
import { selectUser } from 'library/redux/users';
import { icons } from 'resources/icons/profile/index';
import { default as SVG } from 'react-inlinesvg';

import st from './Profile.module.scss';

const Profile: FC = () => {
	const user = useAppSelector(selectUser);
	return (
		<Link to={'/personal'}>
			<div className={st.profile}>
				<div className={st.profile__img}>
					{user?.photo ? <img src={user?.photo} alt="фото профиля" /> : <SVG src={icons.avatar} />}
				</div>
				<div className={st.profile__name}>{`${user?.first_name} ${user?.middle_name}`}</div>
			</div>
		</Link>
	);
};

export default memo(Profile);
