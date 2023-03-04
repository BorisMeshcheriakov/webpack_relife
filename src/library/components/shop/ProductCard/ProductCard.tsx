import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from 'library/models/shop';

import useModulePermissions from 'library/hooks/module/useModulePermissions';
import useUser from 'library/hooks/user/useUser';

import ButtonTooltip from 'library/components/common/buttons/ButtonTooltip';

import Price from './frames/Price';

import styles from './ProductCard.module.scss';

import deal from 'resources/icons/shop/deal.svg';

interface Props {
	product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
	const { can_sell } = useModulePermissions();
	const { isAuth } = useUser();

	return (
		<div className={styles.productCard}>
			<Link className={styles.image} to={{ pathname: `/store/products/product/${product.id}` }}>
				<img src={product.promo_image} alt="" className={styles.img} />
			</Link>
			<Link to={{ pathname: `/store/products/product/${product.id}` }} className={styles.title}>
				<span>{product.title}</span>
			</Link>
			<div className={styles.footer}>
				<Link to={{ pathname: `/store/products/product/${product.id}` }} className={styles.price}>
					<Price
						price={product.current_price}
						partnerPrice={product.partner_price && product.partner_price.partner_amount}
					/>
				</Link>
				{can_sell && isAuth && (
					<Link
						to={{ pathname: `/store/products/recommend/${product.id}` }}
						className={styles.recommend}
					>
						<ButtonTooltip icon={deal} tooltip="Рекомендовать" />
					</Link>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
