import React from 'react';
import qs from 'query-string';

import { clientService } from 'library/api/clientService';

import { useAppDispatch, useAppSelector } from '../common';
import { selectNoteList, changeNoteList } from 'library/redux/clients';

type Props = {
	id: number;
};

const useNoteList = ({ id }: Props) => {
	// const { state, dispatch } = useNotes();
	const dispatch = useAppDispatch();
	const { status, hasNext, page, list } = useAppSelector(selectNoteList);

	const getNotes = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) {
			return;
		}
		dispatch(changeNoteList({ status: 'loading' }));

		let results = [];
		let listPage = page;
		let next = false;

		try {
			const query = { patient: id, page: page };
			let params = qs.stringify(query);
			const response = await clientService.getNotes(params);
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

			dispatch(changeNoteList({ hasNext: next, page: listPage, list: results }));
		} catch (error) {
			console.error(error);
			dispatch(changeNoteList({ hasNext: false }));
		}
		dispatch(changeNoteList({ status: 'idle' }));
	}, [status, hasNext, dispatch, id, page, list]);

	return {
		notes: list,
		page: page,
		hasNext: hasNext,
		status: status,
		getNotes,
	};
};

export default useNoteList;
