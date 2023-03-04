import React from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Program, ProgramList } from 'library/models/programs';

import { useUser } from 'library/hooks/user';
import { useProgramDelete, useFavorite, useProgramPublish } from 'library/hooks/programs';
import { useMenu } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';

const useProgramMenu = (program: Program | ProgramList | null, onClose?: () => void) => {
	const { user, isAuth } = useUser();
	const { anchorEl, open, handleClick, handleClose } = useMenu();

	const { id } = useParams<{ id: string }>();
	const { push } = useHistory();
	const { url } = useRouteMatch();

	const { removeProgram } = useProgramDelete({
		program: program,
		onSuccess: onClose ? () => onClose() : undefined,
	});
	const { publishDialog, unpublishDialog } = useProgramPublish();
	const { addToFavorite, removeFromFavorite } = useFavorite({ program });
	const { locationRoot } = useModuleSettings();

	const isAuthor = React.useCallback(() => {
		return user?.user?.id === program?.author?.id;
	}, [program?.author?.id, user?.user?.id]);

	const share = () => {
		// Поделиться программой
		push(`${url}/share/${program?.pk}`);
		handleClose();
	};

	const recommend = () => {
		// Рекомендовать программу
		push(`${url}/recommend/${program?.pk}`);
		handleClose();
	};

	const edit = () => {
		// Изменить программу
		push(id ? `${url}/edit` : `${url}/program/${program?.pk}/edit`);
		handleClose();
	};

	const remove = () => {
		handleClose();
		if (program) removeProgram();
	};

	const getFavoriteAction = () => {
		// Избранное добавить/удалить
		handleClose();
		if (program) {
			program.favorite ? removeFromFavorite() : addToFavorite();
		}
	};

	// const subscribe = () => {
	// 	// Приобрести программу
	// 	if (!program) return;
	// 	push(`${url}/buy/${program?.pk}`);
	// 	handleClose();
	// };

	const getItems = (program: Program | ProgramList) => {
		let items: { title: string; action: () => void }[] = [];

		let guestItems = [
			{
				title: 'Поделиться',
				action: share,
			},
		];

		let authorItems = [
			{
				title: 'Рекомендовать',
				action: recommend,
			},
			{
				title: 'Изменить',
				action: edit,
			},
			{
				title: 'Удалить',
				action: remove,
			},
		];

		let clientModuleItems = [
			{
				title: 'Рекомендовать',
				action: recommend,
			},
		];

		let userItems = [
			{
				title: program.favorite ? 'Убрать из избранного' : 'Добавить в избранное',
				action: getFavoriteAction,
			},
		];

		if (user?.is_coach) {
			userItems.unshift({
				title: 'Рекомендовать',
				action: recommend,
			});
		} else {
			userItems.unshift({
				title: 'Поделиться',
				action: share,
			});
		}

		// if (canUserBuy(program)) {
		// 	userItems.push({
		// 		title: 'Приобрести',
		// 		action: subscribe,
		// 	});
		// }

		if (!program.published) {
			authorItems.unshift({
				title: 'Опубликовать',
				action: () => publishDialog(program),
			});
		} else {
			authorItems.unshift({
				title: 'Снять с публикации',
				action: () => unpublishDialog(program),
			});
		}

		if (isAuthor()) {
			items = [...items, ...authorItems];
		} else if (isAuth) {
			if (locationRoot === 'clients') {
				items = [...clientModuleItems];
			} else {
				items = [...items, ...userItems];
			}
		} else {
			items = [...items, ...guestItems];
		}

		return items;
	};

	return {
		open,
		anchorEl,
		handleClick,
		handleClose,
		items: program ? getItems(program) : [],
		isAuthor,
	};
};

export default useProgramMenu;
