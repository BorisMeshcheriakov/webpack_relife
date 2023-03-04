import { useCallback, useState, useEffect } from 'react';
import { eventService } from 'library/api/eventService';
import { EventAddress } from 'library/models/events';
import { getEventPlace } from 'library/helpers/events/normalizeEventValue';

const useEventAdress = (address: EventAddress) => {
	const [country, setCountry] = useState<string>('');

	// ф-ция для получения JSON адреса страны

	const getCountry = useCallback(async () => {
		try {
			const response = await eventService.getCountry(+address.country);
			setCountry(response.data.title);
		} catch (err) {
			console.error(err);
		}
	}, [address]);

	// function timeout(ms: number) {
	// 	return new Promise((resolve) => setTimeout(resolve, ms));
	// }

	// const getAddress = useCallback(async () => {
	// 	if (address.latitude) {
	// 		return;
	// 	}

	// 	const totalTries = 5;
	// 	let numberOfTry = 0;

	// 	while (numberOfTry < totalTries) {
	// 		numberOfTry += 1;
	// 		try {
	// 			const response = await eventService.getAddress(address.id);
	// 			if (!response.data.latitude) {
	// 				throw response;
	// 			}
	// 			setEventAddress(response.data);
	// 			break;
	// 		} catch (error) {
	// 			console.error('Координаты не получены');
	// 		}
	// 		await timeout(2000);
	// 	}
	// 	setError('Не удалось загрузить адрес');
	// }, [address]);

	useEffect(() => {
		getCountry();
		// getAddress();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { validAddress: getEventPlace(address, country) };
};

export default useEventAdress;
