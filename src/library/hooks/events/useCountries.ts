import { deliveryService } from 'library/api/deliveryService';
import { Country } from 'library/models/delivery';
import React from 'react';

const useCountries = () => {
	const [countries, setCountries] = React.useState<Country[]>([]);
	const [status, setStatus] = React.useState<string>('idle');

	const getCountries = async () => {
		setStatus('loading');
		try {
			const response = await deliveryService.getCountries();
			if (!response.data) {
				throw response;
			}

			setCountries(response.data);
		} catch (error) {}
		setStatus('loaded');
	};

	React.useEffect(() => {
		status === 'idle' && getCountries();
	}, [status]);

	return {
		countries,
		status,
	};
};

export default useCountries;
