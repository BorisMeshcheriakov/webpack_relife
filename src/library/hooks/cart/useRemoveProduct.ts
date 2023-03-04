import { useAppDispatch } from 'library/hooks/common';
import {
	removeFromCart,
	// selectDeleteStatus
} from 'library/redux/cart';
import { openDialogModal } from 'library/redux/modal';

const useRemoveProduct = () => {
	const dispatch = useAppDispatch();
	// const deleteStatus = useAppSelector(selectDeleteStatus);

	const removeProduct = (id: string) => {
		dispatch(
			openDialogModal({
				title: 'Удаление товара',
				text: 'Вы хотите убрать товар из корзины?',
				confirmText: 'Удалить товар',
				confirm: () => dispatch(removeFromCart(id)),
				declineText: 'Оставить',
			})
		);
	};

	return {
		removeProduct,
	};
};

export default useRemoveProduct;
