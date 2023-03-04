import { menuBtn } from 'library/types/admin';
import { useMemo } from 'react';
import { icons } from 'resources/icons/admin/index';

const useMenuButtons = () => {
	const menuDynamicBtns: menuBtn[] = useMemo(
		() => [
			{ title: 'Клиенты', link: '/clients', disabled: false, icon: icons.clients },
			{ title: 'Специалисты', link: '/specialists', disabled: false, icon: icons.spec },
			{ title: 'Видео', link: '/1', disabled: false, icon: icons.video },
			{ title: 'Консультации', link: '/schedules', disabled: false, icon: icons.constlt },
			{ title: 'Мероприятия', link: '/events', disabled: false, icon: icons.events },
			{ title: 'Статьи', link: '#', disabled: true, icon: icons.article },
			{ title: 'Магазин', link: '/store', disabled: false, icon: icons.shop },
			{ title: 'Обучение', link: '#', disabled: true, icon: icons.teach },
		],
		[]
	);

	const menuStaticBtns: menuBtn[] = useMemo(
		() => [
			{ title: 'Безопасность', link: '#', disabled: true, icon: icons.sec },
			{ title: 'Соглашение', link: '#', disabled: true, icon: icons.contact },
		],
		[]
	);

	return { menuStaticBtns, menuDynamicBtns };
};
export default useMenuButtons;
