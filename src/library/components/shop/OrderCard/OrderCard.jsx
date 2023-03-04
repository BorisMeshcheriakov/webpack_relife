import { Link } from 'react-router-dom';

import useModulePermissions from 'library/hooks/module/useModulePermissions';

import OrderNumber from './frames/OrderNumber/index';
import ProductTitle from './frames/ProductTitle';
import OrderPrice from './frames/OrderPrice';
import DeliveryCompany from './frames/DeliveryCompany';

import { Status } from 'library/components/shop';

import styles from './OrderCard.module.scss';

const OrderCard = ({ order }) => {
	const { isPartner } = useModulePermissions();

	const calcultePartnerPrice = () => {
		let partner = 0;
		for (const item of order.items) {
			if (item.partner_price) {
				partner += item.partner_price.partner_amount * item.count;
			} else {
				partner += item.product.current_price * item.count;
			}
		}

		return partner;
	};

	return (
		<Link
			to={{ pathname: `/store/orders/order/${order.id}`, state: { order } }}
			className={styles.order}
		>
			<div className={styles.order__container}>
				<div className={styles.order__left}>
					{/* <div className={styles.photo}>
						<OrderPhoto photos={order.items.map((item) => item.product.promo_image)} />
					</div> */}
					<div className={styles.info}>
						<div className={styles.info__top}>
							<div className={styles.number}>
								<OrderNumber orderNumber={order.short_id} date={order.updated_at} />
							</div>
							<div className={styles.title}>
								<ProductTitle products={order.items} />
							</div>
						</div>
						<div className={styles.info__bottom}>
							<div className={styles.price}>
								<OrderPrice price={isPartner() ? calcultePartnerPrice() : order.amount} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.order__right}>
					<div className={styles.status}>
						<Status order={order} />
					</div>
					<div className={styles.delivery}>
						<DeliveryCompany order={order} />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default OrderCard;
