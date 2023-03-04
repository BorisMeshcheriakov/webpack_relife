import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';

import { shopService } from 'library/api/shopService';

import { openNotifyModal } from 'library/redux/modal';
import { clearShop } from 'library/redux/shop';
import { AxiosError } from 'axios';
import { Order } from 'library/models/shop';
import { useCertificateMessage } from '../common';

const useOrder = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { state } = useLocation<any>();
	const { params } = useRouteMatch<any>();
	const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
	const [order, setOrder] = React.useState<Order>({} as Order);

	const { onRedirect } = useCertificateMessage();

	const repeatPayment = async () => {
		// setIsPaymentOpen(true);
		try {
			const response = await shopService.buyProduct(order.id);
			if (!response.data) {
				throw response;
			}

			// setUrl(response.data.redirect_url);

			if (response.data.redirect_url) {
				onRedirect(response.data.redirect_url);
			}
		} catch (error) {
			setIsPaymentOpen(false);
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
				}
			}
		}
	};

	const onPaySuccess = async () => {
		const id = order.id;

		try {
			await shopService.confirmOrderFront(id);
		} catch (error) {}
		setIsPaymentOpen(false);
		dispatch(clearShop());
		push('/store/orders');
		dispatch(
			openNotifyModal({
				title: '',
				text: 'Ваш заказ успешно оплачен',
				confirmText: 'Ок',
			})
		);
	};

	React.useEffect(() => {
		state?.order
			? setOrder(state.order)
			: shopService.getOrder(params.id).then((res) => {
					setOrder(res.data);
			  });
	}, [state, params.id]);

	const closeModal = () => {
		push(`/store/orders`);
	};

	return {
		closeModal,
		order,
		repeatPayment,
		isPaymentOpen,
		setIsPaymentOpen,
		onPaySuccess,
	};
};

export default useOrder;
