import { FC } from 'react';
import cn from 'classnames';

import useProducts from 'library/hooks/shop/useProducts';

import { ProductCard, Loader, Blank } from 'library/components/shop';

import st from './Products.module.scss';

const Products: FC = () => {
	const { products, lastElement, isLoading, search } = useProducts();

	return isLoading ? (
		<Loader text="Загрузка..." />
	) : (
		<div className={cn(st.products, products.length === 0 ? st.blank : st.cards)}>
			{products.length !== 0 &&
				products.map((product) => <ProductCard product={product} key={product.id} />)}

			{!isLoading && products.length === 0 && search && <Blank text="Товары не найдены" />}

			<div ref={lastElement} />
		</div>
	);
};

export default Products;
