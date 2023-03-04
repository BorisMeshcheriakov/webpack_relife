import { useAppSelector } from 'library/hooks/common/reduxTypedHooks';

import { selectCartItems } from 'library/redux/cart';

const useProducts = () => {
	const items = useAppSelector(selectCartItems);

	return {
		items,
	};
};

export default useProducts;
