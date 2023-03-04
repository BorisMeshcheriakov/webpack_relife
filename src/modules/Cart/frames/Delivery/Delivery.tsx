import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { CartValues } from 'library/types/cart';

import { useDelivery } from 'library/hooks/cart';

import { CitySelect, DeliveryMap, PointSelect, Method } from 'library/components/cart';
import { Loader, Blank } from 'library/components/common';

import st from './Delivery.module.scss';
import { CdekCity } from 'library/models/delivery';

interface Props {
	control: Control<CartValues, object>;
}

const Delivery: React.FC<Props> = ({ control }) => {
	const delivery = useDelivery();

	return (
		<>
			<div className={st.address}>
				<Controller
					control={control}
					name="city"
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<CitySelect
							citySearch={delivery.city}
							onSearchChange={delivery.setCity}
							cities={delivery.cityList}
							onChange={onChange}
							selected={value}
							error={error}
							setCity={delivery.saveCity}
						/>
					)}
					defaultValue={delivery.selectedCity}
				/>

				{delivery.selectedCity && delivery.pickupPoints.length > 0 && <Method />}

				{delivery.pickupPoints.length > 0 && (
					<Controller
						control={control}
						name="pickup_point"
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<PointSelect
								points={delivery.pickupPoints}
								selected={value}
								onChange={onChange}
								error={error}
								savePoint={delivery.savePoint}
							/>
						)}
						defaultValue={delivery.selectedPoint}
					/>
				)}
			</div>

			<div className={st.map}>
				{delivery.cityLoading === 'loading' && <Loader text="Загрузка городов" />}
				{delivery.cityLoading !== 'loading' && delivery.pointsLoading === 'loading' && (
					<Loader text="Загрузка точек выдачи" />
				)}
				{delivery.cityLoading === 'loaded' &&
					delivery.pointsLoading === 'loaded' &&
					delivery.pickupPoints?.length === 0 && (
						<Blank text="В выбранном городе нет пунктов выдачи CDEK. Выберите другой город, в котором есть доставка CDEK" />
					)}
				{delivery.pointsLoading === 'loaded' &&
					delivery.pickupPoints?.length > 0 &&
					delivery.selectedCity && (
						<Controller
							control={control}
							name="pickup_point"
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<DeliveryMap
									points={delivery.pickupPoints}
									city={delivery.selectedCity ?? ({} as CdekCity)}
									value={value}
									onChange={onChange}
									savePoint={delivery.savePoint}
								/>
							)}
							defaultValue={delivery.selectedPoint}
						/>
					)}
			</div>
		</>
	);
};

export default Delivery;
