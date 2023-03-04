import React from 'react';
import { getCookie } from 'setupCookie';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { getIAm } from 'library/redux/users';

const useLoadUser = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		const token = getCookie('token');
		token && dispatch(getIAm());
	}, [dispatch]);

	return {};
};

export default useLoadUser;
