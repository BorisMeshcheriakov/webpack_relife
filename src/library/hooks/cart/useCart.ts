import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import { CartValues } from 'library/types/cart';
import { CDEKPickupPoint } from 'library/models/delivery';
import { CdekCity } from 'library/models/delivery';

import { selectCartItems, selectCartStatus, selectCity, selectPoint } from 'library/redux/cart';
import { closeCart } from 'library/redux/cart';

import { schema } from 'library/helpers/cart';

const useCart = () => {
	const dispatch = useAppDispatch();

	const status = useAppSelector(selectCartStatus);
	const items = useAppSelector(selectCartItems);
	const city = useAppSelector(selectCity);
	const point = useAppSelector(selectPoint);

	const { handleSubmit, control, setValue, ...methods } = useForm<CartValues>({
		defaultValues: {
			city: {} as CdekCity,
			pickup_point: {} as CDEKPickupPoint,
		},
		resolver: yupResolver(schema),
	});

	// console.log(errors);

	const close = () => dispatch(closeCart());

	useEffect(() => {
		setValue('city', city ? city : ({} as CdekCity));
		setValue('pickup_point', point ? point : ({} as CDEKPickupPoint));
	}, [setValue, city, point]);

	return {
		close,
		control,
		handleSubmit,
		status,
		items,
		methods: { handleSubmit, control, setValue, ...methods },
	};
};

export default useCart;
