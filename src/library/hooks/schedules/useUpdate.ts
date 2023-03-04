import { CoachAvailablePeriods } from 'library/models/schedules';
import { selectAddress, selectMode, updateConsultation } from 'library/redux/schedules';
import { SessionUpdate } from 'library/types/schedules';
import { useAppDispatch, useAppSelector } from '../common';

const useUpdate = () => {
	const dispatch = useAppDispatch();
	const mode = useAppSelector(selectMode);
	const address = useAppSelector(selectAddress);

	const update = (consultation: CoachAvailablePeriods) => {
		let session: SessionUpdate = {
			id: consultation.id as number,
			status: consultation.status,
			address: consultation.address.map((address) => address.id),
		};
		let status = [...consultation.status];
		if (status.find((stat) => stat === mode)) {
			status = status.filter((stat) => stat !== mode);
		} else {
			status.push(mode);
			status = status.sort((a, b) => (a > b ? -1 : 1));
		}

		session = { ...session, status: status };

		if (mode === 'OF' && address) {
			session = { ...session, address: [address.id] };
		}
		// console.log(session);
		dispatch(updateConsultation(session));
	};

	return { update };
};

export default useUpdate;
