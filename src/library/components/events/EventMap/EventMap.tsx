import { EventAddress } from 'library/models/events';
import React from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import useWindowDimensions from 'library/hooks/common/useWindowDimensions';

import st from './EventMap.module.scss';

type Props = {
	address?: EventAddress;
};

const EventMap: React.FC<Props> = ({ address }) => {
	const [coords, setCoords] = React.useState<number[]>([]);
	const [mapState, setMapState] = React.useState<any>({ center: [55.75, 37.57], zoom: 9 });
	const { width, height } = useWindowDimensions();

	const setPosition = (address: EventAddress | undefined) => {
		if (address && address.latitude && address.longitude) {
			let latitude = parseFloat(address.latitude);
			let longtitude = parseFloat(address.longitude);
			setMapState({ center: [longtitude, latitude], zoom: 9 });
		}
	};

	React.useEffect(() => {
		setPosition(address);
	}, [address]);

	return (
		<>
			<YMaps query={{ apikey: 'e41b26d5-0683-48ca-a90d-38d65ac91ee4', lang: 'ru_RU' }}>
				<Map
					width="100%"
					height={width > 415 ? 400 : 315}
					modules={['geolocation', 'geocode']}
					defaultState={{ center: [55.75, 37.57], zoom: 9 }}
					state={mapState}
					onLoad={() => setPosition(address)}
				>
					{address && <Placemark geometry={[...mapState.center]} />}
				</Map>
			</YMaps>
		</>
	);
};

export default EventMap;
