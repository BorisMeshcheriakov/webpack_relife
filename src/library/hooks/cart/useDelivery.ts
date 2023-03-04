import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { CdekCity, CDEKPickupPoint } from 'library/models/delivery';

import { deliveryService } from 'library/api/deliveryService';
import {
	changeCity,
	selectOrderId,
	selectCity,
	changeMetadata,
	selectPoint,
} from 'library/redux/cart';
import { saveOrder } from 'library/redux/cart';

const useDelivery = () => {
	const dispatch = useAppDispatch();
	const [cityLoading, setCityLoading] = useState<string>('idle');
	const [city, setCity] = useState<string>('');
	const [cityList, setCityList] = useState<CdekCity[]>([]);

	const [pointsLoading, setPointsLoading] = useState<string>('idle');
	const [pickupPoints, setPickupPoints] = useState<CDEKPickupPoint[]>([]);

	const orderId = useAppSelector(selectOrderId);
	const savedCity = useAppSelector(selectCity);
	const savedPoint = useAppSelector(selectPoint);

	useEffect(() => {
		//  запрашиваем города

		const getCities = async (city: string) => {
			setCityLoading('loading');
			try {
				const response = await deliveryService.getCdekCityList(city);
				const cities = [...response.data.results];
				setCityList(cities);
			} catch (error) {}
			setCityLoading('loaded');
		};

		if (city) {
			getCities(city);
		} else {
			setCityList([]);
		}
	}, [city]);

	useEffect(() => {
		// запрашиваем точки выдачи

		const getPickupPoints = async (code: { city_code: number }) => {
			setPointsLoading('loading');
			try {
				const response = await deliveryService.getPoints(code);
				let points = [...response.data];
				points = points.filter(
					(e, i) => points.findIndex((a) => a.address === e.address || a.phone === e.phone) === i
				);
				setPickupPoints(points);
			} catch (error) {}
			setPointsLoading('loaded');
		};

		setPickupPoints([] as CDEKPickupPoint[]);

		// if (!city && savedCity) setCity(savedCity.title);

		if (savedCity) {
			getPickupPoints({ city_code: savedCity.code });
		}
	}, [savedCity, dispatch]);

	const saveCity = async (city: CdekCity) => {
		const from = 438; // код Ростова-на-Дону
		dispatch(changeCity(city));

		try {
			const response = await deliveryService.calcDelivery({
				from_location: from,
				to_location: city.code,
				order: orderId,
				delivery_sum: 0,
			});
			if (!response.data) {
				throw response;
			}
			dispatch(changeMetadata(response.data as any));
		} catch (error) {}
	};

	const savePoint = (point: CDEKPickupPoint) => {
		dispatch(
			saveOrder({
				carrier: 'C',
				pickup_point: point.id,
			})
		);
	};

	return {
		city,
		setCity,
		cityList,
		pickupPoints,
		cityLoading,
		pointsLoading,
		saveCity,
		savePoint,
		selectedCity: savedCity,
		selectedPoint: savedPoint,
	};
};

export default useDelivery;
