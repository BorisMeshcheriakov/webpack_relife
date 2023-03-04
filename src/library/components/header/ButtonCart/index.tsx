import cn from 'classnames';

import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import { openCart, selectIsCartOpen } from 'library/redux/cart';

import st from './index.module.scss';

import { selectCartItems } from 'library/redux/cart';
import { ShoppingCart } from 'shared/assets';

interface Props {
	hideMenu?: () => void;
}

const ButtonCart = ({ hideMenu }: Props) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectCartItems);
	const isCartOpen = useAppSelector(selectIsCartOpen);

	const onCartClick = () => {
		dispatch(openCart());
		hideMenu && hideMenu();
	};

	return (
		<button className={cn(st.button, isCartOpen && st.active)} onClick={onCartClick}>
			<ShoppingCart />
			{items && items.length > 0 && <span className={st.quantity}>{items.length}</span>}
		</button>
	);
};

export default ButtonCart;
