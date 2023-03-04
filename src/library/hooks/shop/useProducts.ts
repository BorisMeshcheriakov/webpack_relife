import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { getProducts } from 'library/redux/shop';
import { selectProducts, selectProductsLoaded, selectProductsLoading, selectSearch } from 'library/redux/shop';

const useProducts = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectProducts);
	const isLoading = useAppSelector(selectProductsLoading);
	const loaded = useAppSelector(selectProductsLoaded);
	const search = useAppSelector(selectSearch);

	const lastElement = useRef<HTMLDivElement>(null);
	const observer = useRef<IntersectionObserver>();

	useEffect(() => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		const isLastVisible = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting && !loaded) {
				dispatch(getProducts());
			}
		};
		observer.current = new IntersectionObserver(isLastVisible);
		lastElement.current && observer.current.observe(lastElement.current);
	}, [dispatch, isLoading, loaded, search]);

	return {
		products,
		lastElement,
		isLoading,
		search,
	};
};

export default useProducts;
