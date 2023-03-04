import React from 'react';
import qs from 'query-string';

import { clientService } from 'library/api/clientService';
import { useAppDispatch, useAppSelector } from '../common';
import { changeClient, changeClients, selectClients } from 'library/redux/clients';
import { useLocation } from 'react-router-dom';
import useClient from './useClient';

const useClientList = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { search, status, page, hasNext, list } = useAppSelector(selectClients);
	const controller = React.useMemo(() => new AbortController(), []);
	useClient();

	const getClients = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) return;

		dispatch(changeClients({ status: 'loading' }));
		try {
			const query = qs.stringify({
				page: page,
				search: search ? search : undefined,
			});
			const response = await clientService.getClients(query, { signal: controller.signal });

			if (!response.data) {
				dispatch(changeClients({ hasNext: false }));
				throw response;
			}

			let clients = [...list];
			let hasNext = true;
			let listPage = page;

			if (page === 1) {
				clients = response.data.results;

				if (response.data.results.length > 0 && !location.search) {
					dispatch(changeClient(response.data.results[0]));
				}
			} else {
				clients = [...clients, ...response.data.results];
			}

			if (response.data.next) {
				hasNext = true;
				listPage = listPage + 1;
			} else {
				hasNext = false;
			}

			dispatch(
				changeClients({
					list: clients,
					page: listPage,
					hasNext: hasNext,
					status: 'idle',
				})
			);
		} catch (error) {
			console.error(error);
		}
		dispatch(changeClients({ status: 'idle' }));
	}, [status, hasNext, dispatch, page, search, controller.signal, list, location.search]);

	React.useEffect(() => {
		return () => {
			controller.abort();
		};
	}, [controller]);

	return {
		clients: list,
		hasMore: hasNext,
		getClients,
		status: status,
	};
};

export default useClientList;
