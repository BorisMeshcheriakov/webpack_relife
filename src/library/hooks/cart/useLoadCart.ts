import React from 'react';
import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectModulesStatus, selectModules } from 'library/redux/common';
import { getCart, selectCartStatus } from 'library/redux/cart';
import useUser from 'library/hooks/user/useUser';

const useLoadCart = () => {
	const dispatch = useAppDispatch();
	const { isAuth } = useUser();

	const modulesStatus = useAppSelector(selectModulesStatus);
	const modules = useAppSelector(selectModules);
	const cartStatus = useAppSelector(selectCartStatus);

	React.useEffect(() => {
		// проверяем авторизацию и подключение магазина
		if (isAuth) {
			if (
				modules?.filter((appModule) => appModule.code === 'store').length !== 0 &&
				cartStatus === 'idle'
			) {
				dispatch(getCart());
			}
		}
	}, [isAuth, dispatch, modulesStatus, modules, cartStatus]);

	return {};
};

export default useLoadCart;
