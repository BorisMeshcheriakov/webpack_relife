import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../common';
import { resetEvents, selectEvents, setSearch } from 'library/redux/events';

const useSearch = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { search } = useAppSelector(selectEvents);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = () => {
		!isOpen && setIsOpen(true);
	};

	const close = () => {
		if (search.length) {
			dispatch(resetEvents());
			dispatch(setSearch(''));
		}

		setIsOpen(false);
	};

	// тестовый поиск //

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(resetEvents());
		dispatch(setSearch(e.target.value));
	};
	return {
		searchTag: location.search,
		search,
		isOpen,
		setIsOpen,
		open,
		close,
		onChange,
		// getSearch,
	};
};

export default useSearch;
