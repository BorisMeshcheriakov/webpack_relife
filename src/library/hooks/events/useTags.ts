import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { getTags, resetEvents, selectEvents, selectTags, setTags } from 'library/redux/events';
import { Tag } from 'library/models/programs';

const useTags = () => {
	const dispatch = useAppDispatch();
	const allTags = useAppSelector(selectTags); // массив с тегами
	const { tags } = useAppSelector(selectEvents); // выбранные теги
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onSelect = (tag: Tag) => {
		let selectedTags = [...tags];
		let idx = selectedTags.findIndex((storedTag) => storedTag.pk === tag.pk);
		if (idx === -1) {
			selectedTags = [...selectedTags, tag];
		} else {
			selectedTags.splice(idx, 1);
		}
		dispatch(resetEvents());
		dispatch(setTags(selectedTags));
	};

	const isSelected = (tag: Tag) => {
		let selectedTags = [...tags];
		let idx = selectedTags.findIndex((storedTag) => storedTag.pk === tag.pk);
		return idx !== -1;
	};

	const open = () => {
		setIsOpen(true);
	};

	const close = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const getEventTags = () => {
			dispatch(getTags());
		};

		if (allTags.status === 'idle') {
			getEventTags();
		}
	}, [dispatch, allTags]);

	return {
		tags: allTags.list,
		selected: tags,
		onSelect,
		isOpen,
		open,
		close,
		isSelected,
	};
};

export default useTags;
