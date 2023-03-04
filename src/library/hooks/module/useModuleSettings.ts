import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectModules } from 'library/redux/common';
import { Settings } from 'library/models/common';

/**
 *
 * @param code код модуля
 *
 * Получаем настройки для модуля. По умолчанию код модуля берется из
 * маршрута монтирования
 *
 * Для получения настроек другого модуля нужно указать его module.code в
 * параметрах хука
 */

const useModuleSettings = (code?: string) => {
	const modules = useAppSelector(selectModules);
	const location = useLocation();
	const locationRoot = location.pathname.split('/').filter((path) => path)[0];
	const moduleSettings = modules?.find((module) => module.code === (code ? code : locationRoot))
		?.settings as Settings;
	return { moduleSettings, locationRoot, modules };
};

export default useModuleSettings;
