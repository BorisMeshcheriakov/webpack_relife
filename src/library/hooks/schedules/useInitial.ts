import { getConsultations, selectDate, selectTab, selectTimezone } from 'library/redux/schedules';
import { Calendar } from 'library/types/schedules';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../common';
import { useUser } from '../user';
import { useAddressLoad } from 'library/hooks/schedules';

const useInitial = (calendar: Calendar) => {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(selectTab);
	const date = useAppSelector((state) => selectDate(state, calendar));
	const tz = useAppSelector((state) => selectTimezone(state, calendar));

	const { user } = useUser();

	useAddressLoad();

	React.useEffect(() => {
		if (user) {
			dispatch(
				getConsultations({
					date: date,
					tab: calendar === 'consultations' ? tab : 'week',
					id: user?.user?.id!,
					calendar,
					tz,
				})
			);
		}

		return () => {};
		/* eslint-disable-next-line */
	}, [calendar, dispatch, tab, user]);

	return {};
};

export default useInitial;
