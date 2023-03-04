import {
	// useClearCookie,
	useLoadCommonSettings,
	useLoadModules,
	useLoadWebSettings,
} from 'library/hooks/common';
import { useLoadUser } from 'library/hooks/user';
import { useLoadCart } from 'library/hooks/cart';
import { useLoadNotifications } from 'library/hooks/notifications';

const Loader = () => {
	useLoadUser();
	useLoadModules();
	useLoadCart();
	useLoadWebSettings();
	useLoadNotifications();
	useLoadCommonSettings();
	// useClearCookie();
	return <></>;
};

export default Loader;
