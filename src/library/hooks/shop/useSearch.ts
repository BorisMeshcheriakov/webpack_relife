import { search, selectSearch } from 'library/redux/shop';
import { useEffect, useRef, useState } from 'react';
import { matchPath, useLocation, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../common';
import useDebounce from '../common/useDebounce';

const useSearch = () => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearch);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { params } = useRouteMatch<{ tab: string }>();
	const searchRef = useRef(null);
	const { value, setValue, handleChange } = useDebounce(
		(value) => dispatch(search(value)),
		searchValue
	);
	const useParams = (path: string) => {
		const { pathname } = useLocation();
		const match = matchPath(pathname, { path });
		return match?.params || {};
	};
	const { tab }: any = useParams('/store/:tab');

	useEffect(() => {
		if (searchValue) {
			setValue('');
			dispatch(search(''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab, dispatch]);

	const open = () => {
		!isOpen && setIsOpen(true);
	};

	const close = () => {
		value && handleChange('');
		setIsOpen(false);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e.target.value);
	};

	const getPlaceholder = () => {
		let placeholder: string = '';
		switch (tab) {
			case 'products':
				placeholder = 'Наименование товара';
				break;
			case 'orders':
				placeholder = 'Номер заказа';
				break;
			default:
				break;
		}
		return isOpen ? placeholder : '';
	};

	return {
		searchRef,
		value,
		setValue: onChange,
		isOpen,
		open,
		close,
		setIsOpen,
		params,
		placeholder: getPlaceholder,
	};
};

export default useSearch;
