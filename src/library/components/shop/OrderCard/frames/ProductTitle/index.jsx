import { useMemo } from 'react';

import styles from './index.module.scss';

/*
    в пропсах приходит: 
    productsTitle -  Названия товаров (type: string)
    moreProductsCount - Количество товаров больше трех, то есть елси тут значение === 1 тогда товаров всего 4 (type: number)
*/
const ProductTitle = ({ products }) => {
	const productTitle = useMemo(() => {
		const titles = products.map((item) => item.product.title);

		return titles.join(', ');
	}, [products]);

	return <h3 className={styles.order__productTitle}>{productTitle}</h3>;
};

export default ProductTitle;
