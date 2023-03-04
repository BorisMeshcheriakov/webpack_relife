import React from 'react';

import { useProducts } from 'library/hooks/cart';

import { ProductCard } from 'library/components/cart';

const Products: React.FC = () => {
	const products = useProducts();

	return (
		<>
			{products.items && products.items.map((item) => <ProductCard key={item.id} product={item} />)}
		</>
	);
};

export default Products;
