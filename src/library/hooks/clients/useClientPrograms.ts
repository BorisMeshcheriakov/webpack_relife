import { clientService } from 'library/api/clientService';
import React from 'react';
import qs from 'query-string';
import { useAppDispatch, useAppSelector } from '../common';
import { changeProgramList, selectClientPrograms } from 'library/redux/clients';
import useClient from './useClient';

type Props = {
	section: string;
};

const useClientPrograms = ({ section }: Props) => {
	const dispatch = useAppDispatch();
	const { status, page, hasNext, list } = useAppSelector(selectClientPrograms);
	const { client } = useClient();

	const getPrograms = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) return;

		dispatch(changeProgramList({ status: 'loading' }));
		try {
			const query = {
				program__common_tag__section__id: section,
				page: page,
				user: client?.user.id,
			};

			const response = await clientService.getClientPrograms(qs.stringify(query));

			let results = [];
			let listPage = page;
			let next = false;

			if (page === 1) {
				results = response.data.results;
			} else {
				results = [...list, ...response.data.results];
			}

			if (response.data.next) {
				next = true;
				listPage = page + 1;
			} else {
				next = false;
			}
			dispatch(changeProgramList({ page: listPage, hasNext: next, list: results }));
		} catch (error) {
			console.error(error);
		}

		dispatch(changeProgramList({ status: 'idle' }));
	}, [status, hasNext, dispatch, section, page, client?.user.id, list]);

	return {
		getPrograms,
		programs: list,
		page,
		hasMore: hasNext,
		status: status,
	};
};

export default useClientPrograms;
