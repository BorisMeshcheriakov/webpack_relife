import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { selectOrders, selectOrdersLoaded, selectOrdersLoading, selectSearch } from 'library/redux/shop';

import { getOrders } from 'library/redux/shop';

const useOrders = () => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector(selectOrders);
	const isLoading = useAppSelector(selectOrdersLoading);
	const loaded = useAppSelector(selectOrdersLoaded);
	const search = useAppSelector(selectSearch);

	const lastElement = useRef<HTMLDivElement>(null);
	const observer = useRef<IntersectionObserver>();

	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		const isLastVisible = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting && !loaded) {
				dispatch(getOrders());
			}
		};
		observer.current = new IntersectionObserver(isLastVisible);
		lastElement.current && observer.current.observe(lastElement.current);
	}, [dispatch, isLoading, loaded, search]);

	return { orders, lastElement, isLoading, search };
};

export default useOrders;
