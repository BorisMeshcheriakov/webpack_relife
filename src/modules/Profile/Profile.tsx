import React from 'react';
import { Link, Route } from 'react-router-dom';
import useUser from 'library/hooks/user/useUser';

import { ButtonText } from 'library/components/common/buttons';
import { Image, Info } from 'library/components/profile';
import Editor from './frames/Editor';

import st from './Profile.module.scss';

import { icons } from 'resources/icons/profile';

const Profile: React.FC = () => {
	const { user, name, gender } = useUser();

	return (
		<>
			<div className={st.profile}>
				<nav className={st.navbar}>
					<span>{name}</span>
					<Link to="personal/edit">
						<ButtonText text="Редактировать" />
					</Link>
				</nav>
				<div className={st.main}>
					<Image url={user?.user?.photo} empty={icons.avatar} />
					<div className={st.info}>
						{gender && <Info icon={icons.gender} data={gender} />}
						{user?.user?.phonenumber && <Info icon={icons.phone} data={user?.user?.phonenumber} />}
						{user?.user?.email && <Info icon={icons.mail} data={user?.user?.email} />}
					</div>
				</div>
			</div>
			<Route path="/personal/edit" component={Editor} />
		</>
	);
};

export default Profile;
