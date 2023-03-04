import React from 'react';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { getCookie } from '../../../setupCookie';

import { selectUser } from 'library/redux/users';

const useUser = () => {
	const user = useAppSelector(selectUser);
	const token = getCookie('token');

	const fullName = React.useCallback(() => {
		return `${user?.last_name} ${user?.first_name} ${user?.middle_name}`;
	}, [user]);

	const gender = React.useCallback(() => {
		if (user?.id) {
			return user.gender === 'm' ? 'Мужчина' : 'Женщина';
		}
	}, [user]);

	return {
		user: user,
		isAuth: !!(user?.id && token),
		name: fullName(),
		gender: gender(),
	};
};

export default useUser;
