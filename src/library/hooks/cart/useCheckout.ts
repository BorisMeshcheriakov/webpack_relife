import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'library/hooks/common/reduxTypedHooks';
import useModulePermissions from 'library/hooks/module/useModulePermissions';

import { AxiosError } from 'axios';

import { clearCart, closeCart, selectOrderId } from 'library/redux/cart';
import { clearShop } from 'library/redux/shop';
import { openNotifyModal, openDialogModal } from 'library/redux/modal';

import { shopService } from 'library/api/shopService';
import { selectCartItems } from 'library/redux/cart';
import { useCertificateMessage } from '../common';

const useCheckout = () => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const items = useAppSelector(selectCartItems);
	const id = useAppSelector(selectOrderId);

	const { modulePermissions } = useModulePermissions();

	const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

	const { onRedirect } = useCertificateMessage();

	const isPartner = () => {
		const permissions = modulePermissions.getPermissions('store');
		return permissions?.indexOf('can_sell') !== -1;
	};

	const [loading, setLoading] = useState<boolean>(false);

	// const applyCode = () => dispatch(applyPromo(code));

	const partnerPay = async () => {
		setLoading(true);
		try {
			const response = await shopService.specialBuy(id);

			if (!response.data) {
				throw response;
			}

			dispatch(closeCart());
			dispatch(clearCart());
			history.push('/store/orders');
			dispatch(clearShop());
			dispatch(
				openNotifyModal({
					title: 'Заказ успешно создан',
					text: 'Менеджер магазина свяжется с Вами в самое ближайшее время для уточнения деталей заказа',
					confirmText: 'Ок',
				})
			);
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				if (err.response.data[0].message === 'Product position absent in storage') {
					dispatch(
						openNotifyModal({
							title: '',
							text: 'Недостаточно товара на складе',
							confirmText: 'Ок',
						})
					);
					// for (const message of err.response.data) {
					// 	// dispatch(setError(message));
					// }
				}
			}
		}
		setLoading(false);
	};

	const buyerPay = async () => {
		// setIsPaymentOpen(true);
		try {
			const response = await shopService.buyProduct(id);
			if (!response.data) {
				throw response;
			}

			// setUrl(response.data.redirect_url);
			if (response.data.redirect_url) {
				onRedirect(response.data.redirect_url);
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				let message = '';
				if (err.response.data[0].message === 'Product position absent in storage') {
					message = 'Недостаточно товара на складе';
					// for (const message of err.response.data) {
					// 	// dispatch(setError(message));
					// }
				} else {
					message = 'Ошибка подключения к системе оплаты. Попробуйте позже';
				}
				dispatch(
					openNotifyModal({
						title: '',
						text: message,
						confirmText: 'Ок',
					})
				);
			}
			setIsPaymentOpen(false);
		}
	};

	const payOrder = async () => {
		if (isPartner()) {
			partnerPay();
		} else {
			buyerPay();
		}
	};

	const onPaySuccess = async () => {
		try {
			await shopService.confirmOrderFront(id);
		} catch (error) {}

		setIsPaymentOpen(false);
		dispatch(closeCart());
		dispatch(clearCart());
		dispatch(clearShop());
		history.push('/store/orders');
		dispatch(
			openNotifyModal({
				title: '',
				text: 'Ваш заказ успешно оплачен',
				confirmText: 'Ок',
			})
		);
	};

	const confirmAquiringClose = () => {
		setIsPaymentOpen(false);
		dispatch(closeCart());
		dispatch(clearCart());
		dispatch(clearShop());
	};

	const onClose = () => {
		dispatch(
			openDialogModal({
				title: 'Закрыть корзину',
				text: 'Вы действительно хотите закрыть корзину? Ваш заказ сохранится на вкладке "Мои заказы", где его можно будет оплатить позднее',
				confirmText: 'Закрыть',
				confirm: () => confirmAquiringClose(),
				declineText: 'Отмена',
			})
		);
	};

	return {
		items,
		isPartner: isPartner(),
		isPaymentOpen,
		setIsPaymentOpen,
		payOrder,
		onPaySuccess,
		onClose,
		loading,
	};
};

export default useCheckout;
