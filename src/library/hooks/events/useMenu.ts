import React from 'react';

import { Event } from 'library/models/events';
import { useMenu as useMuiMenu } from '../common';
import { useUser } from 'library/hooks/user';
import { useDelete, usePublicate, useShare } from 'library/hooks/events';
import { useHistory } from 'react-router-dom';
import { checkEventEnd } from 'library/helpers/events/dateSets';

type Props = {
	event: Event;
};

const useMenu = ({ event }: Props) => {
	const { push } = useHistory();
	const { user } = useUser();
	const { deleteEvent } = useDelete(`${event.id}`);
	const { publicate, unpublicate } = usePublicate();
	const { openShare } = useShare();

	const { anchorEl, handleClick, handleClose, open } = useMuiMenu();

	const isAuthor = React.useCallback(() => {
		return user?.user?.id === event.author.id;
	}, [event?.author.id, user?.user?.id]);

	const share = () => {
		openShare(event.id);
		handleClose();
	};

	const publish = () => {
		publicate(event.id);
		handleClose();
	};

	const unpublish = () => {
		unpublicate(event.id);
		handleClose();
	};

	const edit = () => {
		push(`/events/${event.id}/edit`);
		handleClose();
	};

	const remove = () => {
		deleteEvent(event.id);
		handleClose();
	};

	const getItems = () => {
		let items = [
			{
				title: 'Поделиться',
				action: share,
			},
		];

		if (isAuthor()) {
			if (checkEventEnd(event.time_to)) {
				return (items = [
					{
						title: 'Удалить',
						action: remove,
					},
				]);
			}

			if (!event.published) {
				items.push({
					title: 'Опубликовать',
					action: publish,
				});
			}

			if (event.published) {
				items.push({
					title: 'Снять с публикации',
					action: unpublish,
				});
			}

			items.push({
				title: 'Изменить',
				action: edit,
			});

			items.push({
				title: 'Удалить',
				action: remove,
			});
		}

		return items;
	};

	return {
		open,
		handleClick,
		handleClose,
		anchorEl,
		items: getItems(),
	};
};

export default useMenu;
