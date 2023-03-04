import qs from 'query-string';
import { useAppSelector } from '../common';
import { selectClient } from 'library/redux/clients';
import useLoadClient from './useLoadClient';
import { useLocation } from 'react-router-dom';

const useClient = (id?: string | number) => {
	const { search } = useLocation();
	const searchParams = qs.parse(search);

	useLoadClient({ id: searchParams.client });
	const selectedClient = useAppSelector(selectClient);

	// const phone = (phonenumber: string) => {
	// 	let phone: string[] = [];
	// 	try {
	// 		phone = JSON.parse(phonenumber.replace(/"/g, "'").replace(/'/g, '"'));
	// 	} catch (error) {
	// 		console.error(error);
	// 	}

	// 	return phone.length ? phone[0] : '';
	// };

	return {
		client: selectedClient,
		// setClientData,
	};
};

export default useClient;
