import { createName } from 'library/helpers/cart';
import { saveOrder, selectClient } from 'library/redux/cart';
import { selectUser } from 'library/redux/users';
import { Client } from 'library/types/cart';

import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../common';

const useClientData = () => {
	const dispatch = useAppDispatch();
	const client = useAppSelector(selectClient);
	const user = useAppSelector(selectUser);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleChange = useCallback(
		debounce((value: any, field: string, client: Client) => {
			let data = {};
			if (field === 'first_name' || field === 'last_name' || field === 'middle_name') {
				data = { full_name: createName(client, field, value) };
			} else {
				data = { [field]: value };
			}
			dispatch(saveOrder(data));
		}, 300),

		[]
	);

	useEffect(() => {
		if (
			!client.first_name &&
			!client.last_name &&
			!client.middle_name &&
			!client.phone &&
			!client.email
		) {
			dispatch(
				saveOrder({
					full_name: `${user?.last_name} ${user?.first_name} ${user?.middle_name}`,
					phone: user?.user?.phonenumber ?? '',
					email: user?.email,
				})
			);
		}
	}, [
		client,
		user?.first_name,
		user?.last_name,
		user?.middle_name,
		user?.user?.phonenumber,
		user?.email,
		dispatch,
	]);

	return {
		first_name: client.first_name ?? user?.first_name,
		last_name: client.last_name ?? user?.last_name,
		middle_name: client.middle_name ?? user?.middle_name,
		phone: client.phone ? client.phone : user?.user?.phonenumber ?? '',
		email: client.email ?? user?.email,
		handleChange,
		client,
	};
};

export default useClientData;
