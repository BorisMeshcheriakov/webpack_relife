import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { shopService } from 'library/api/shopService';

import { ProductDetail } from 'library/models/shop';

const usePromocode = () => {
	const params: { id: string } = useParams();
	const [status, setStatus] = useState<string>('idle');
	const [code, setCode] = useState<string>('');
	const [product, setProduct] = useState({} as ProductDetail);

	useEffect(() => {
		const getPromo = async () => {
			setStatus('loading');
			try {
				const response = await shopService.getPromo();
				setCode(response.data.code);
			} catch (error) {}
			setStatus('loaded');
		};

		const getProduct = async () => {
			setStatus('loading');
			try {
				const response = await shopService.getProduct(params.id);
				setProduct(response.data);
			} catch (error) {}
			setStatus('loaded');
		};

		getPromo();
		params.id && getProduct();
	}, [params]);
	return { code, product, status };
};

export default usePromocode;
