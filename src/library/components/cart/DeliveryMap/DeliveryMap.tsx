import React from 'react';
import { CdekCity, CDEKPickupPoint } from 'library/models/delivery';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

interface Props {
	points: CDEKPickupPoint[];
	city: CdekCity;
	value: CDEKPickupPoint;
	onChange: (point: CDEKPickupPoint) => void;
	savePoint: (point: CDEKPickupPoint) => void;
}

const DeliveryMap: React.FC<Props> = ({
	points = [],
	city,
	value = { latitude: '55.755773', longitude: '37.617761' },
	onChange,
	savePoint,
}) => {
	const defaultState = {
		center: [55.755773, 37.617761],
		zoom: 9,
		options: { autoFitToViewport: 'always', maxZoom: 18 },
	};

	const [mapState, setMapState] = React.useState({
		...defaultState,
		center: [
			value.latitude ? parseFloat(value.latitude) : parseFloat(city.latitude),
			value.longitude ? parseFloat(value.longitude) : parseFloat(city.longitude),
		],
	});

	const placeMark = {
		properties: {
			hintContent: 'Это хинт',
			balloonContent: 'Это балун',
		},
		modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
	};

	const onPlacemarkClick = (place: CDEKPickupPoint) => {
		onChange(place);
		savePoint(place);
	};

	React.useEffect(() => {
		if (value.id) {
			setMapState({
				...defaultState,
				center: [parseFloat(value.latitude), parseFloat(value.longitude)],
				zoom: 19,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<YMaps>
			<Map width="100%" height={285} state={mapState} defaultState={defaultState}>
				<Clusterer
					options={{
						preset: 'islands#invertedBlueClusterIcons',
						groupByCoordinates: false,
					}}
				>
					{points &&
						points.map((item) => (
							<Placemark
								{...placeMark}
								key={item.code}
								onClick={() => onPlacemarkClick(item)}
								geometry={[parseFloat(item.latitude), parseFloat(item.longitude)]}
								options={{
									preset: value.id === item.id ? 'islands#redIcon' : 'islands#blueIcon',
								}}
								properties={{
									hintContent: item.address,
									balloonContent: item.address,
									balloonContentHeader: item.address,
									// balloonContentBody: item.address_comment,
									balloonContentFooter: item.work_time,
								}}
							/>
						))}
				</Clusterer>
			</Map>
		</YMaps>
	);
};

export default DeliveryMap;
