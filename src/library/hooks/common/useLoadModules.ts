import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { getModules, selectModulesStatus } from 'library/redux/common';

const useLoadUser = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const modulesStatus = useAppSelector(selectModulesStatus);

	React.useEffect(() => {
		if (
			modulesStatus !== 'loaded' &&
			modulesStatus !== 'loading' &&
			pathname !== '/technical-service'
		) {
			dispatch(getModules());
		}
	}, [dispatch, pathname, modulesStatus]);

	return {};
};

export default useLoadUser;
