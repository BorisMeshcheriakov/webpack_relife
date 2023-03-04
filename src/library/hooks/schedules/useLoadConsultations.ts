import React from 'react';
import qs from 'query-string';

import { schedulesService } from 'library/api/schedulesService';
import { useAppDispatch, useAppSelector } from '../common';
import { selectClientConsultations, setClientConsultations } from 'library/redux/schedules';

const useLoadConsultations = (params?: any) => {
	const dispatch = useAppDispatch();
	const { status, hasNext, list, page } = useAppSelector(selectClientConsultations);

	const getConsultations = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) return;

		dispatch(setClientConsultations({ status: 'loading' }));

		try {
			let requestParams = {
				page: page,
				...params,
			};
			const response = await schedulesService.getConsultations(qs.stringify(requestParams) ?? '');

			if (page === 1) {
				dispatch(setClientConsultations({ list: response.data.results }));
			} else {
				dispatch(setClientConsultations({ list: [...list, ...response.data.results] }));
			}

			if (response.data.next) {
				dispatch(setClientConsultations({ page: page + 1, hasNext: true }));
			} else {
				dispatch(setClientConsultations({ hasNext: false }));
			}
		} catch (error) {
			console.error(error);
		}

		dispatch(setClientConsultations({ status: 'idle' }));
	}, [params, status, hasNext, list, page, dispatch]);

	return {
		getConsultations,
		consultations: list,
		status,
		hasNext,
		page,
	};
};

export default useLoadConsultations;
