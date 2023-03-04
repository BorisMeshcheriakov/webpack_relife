import React from 'react';
import { schedulesService } from 'library/api/schedulesService';
import { useAppDispatch, useAppSelector } from '../common';
import { changeActiveConsultation, selectActiveConsultation } from 'library/redux/schedules';
import { addressString } from 'library/helpers/schedules';
type Props = {
	id: string | number | null;
};

const useLoadConsultation = ({ id }: Props) => {
	const dispatch = useAppDispatch();
	const consultation = useAppSelector(selectActiveConsultation);
	const [address, setAddress] = React.useState('');

	React.useEffect(() => {
		const getConsultation = async (id: number | string) => {
			try {
				const response = await schedulesService.getSession(id);

				if (!response.data) throw response;

				const { data } = response;

				dispatch(changeActiveConsultation(response.data));

				if (data && data.schedule.period.address) {
					// try {
					// 	const addrResponse = await schedulesService.getAddress(data.schedule.address);
					// 	if (!addrResponse.data) throw response;
					// 	setAddress(addressString(addrResponse.data));
					// } catch (error) {
					// 	console.error(error);
					// }

					setAddress(addressString(data.schedule.period.address[0]));
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (id) getConsultation(id);
		return () => {};
	}, [id, dispatch]);

	return {
		consultation,
		address,
	};
};

export default useLoadConsultation;
