import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectModules } from 'library/redux/common';

const useModulePermissions = () => {
	const modules = useAppSelector(selectModules);
	const { pathname } = useLocation();
	const locationRoot = useMemo(() => pathname.split('/').filter((path) => path)[0], [pathname]);
	const modulePermissions = modules?.find((module) => module.code === locationRoot)?.permissions;

	const getPermissionsForModule = (moduleName: string | undefined) => {
		if (!moduleName) {
			return;
		}
		const modulePermissions = modules?.find((module) => module.code === moduleName)?.permissions;
		return modulePermissions;
	};

	const permissions = {
		getPermissions: getPermissionsForModule,
	};

	// Является ли пользователь партнером по магазину
	const isPartner = () => {
		const permissions = getPermissionsForModule('store');
		return permissions?.indexOf('can_sell') !== -1;
	};

	return {
		view_module: modulePermissions?.indexOf('view_module') !== -1,
		can_sell: modulePermissions?.indexOf('can_sell') !== -1,
		can_buy: modulePermissions?.indexOf('can_buy') !== -1,
		add_module: modulePermissions?.indexOf('add_module') !== -1,
		delete_module: modulePermissions?.indexOf('delete_module') !== -1,
		modulePermissions: permissions,
		isPartner: isPartner,
	};
};

export default useModulePermissions;
