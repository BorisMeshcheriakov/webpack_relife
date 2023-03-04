import { getAddressList } from 'library/redux/schedules';
import React from 'react';
import { useAppDispatch } from '../common';

const useAddressLoad = () => {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(getAddressList());
	}, [dispatch]);

	return {};
};

export default useAddressLoad;
