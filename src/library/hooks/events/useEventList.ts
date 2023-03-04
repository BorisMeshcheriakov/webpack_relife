import React from 'react';
import qs from 'query-string';
import { selectEvents, selectTab, setEvents, setPage, setStatus } from 'library/redux/events';
import { eventService } from 'library/api/eventService';
import { useAppDispatch, useAppSelector } from '../common';

const useEventList = () => {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(selectTab);
	const { list, status, page, search, tags } = useAppSelector(selectEvents);
	const hasMoreItems = !!page;

	const getEvents = React.useCallback(async () => {
		if (status === 'loading') {
			return;
		}

		dispatch(setStatus('loading'));
		try {
			let query = {
				page: page,
				search: search.length ? search : undefined,
				tag: tags.length ? tags.map((tag) => tag.pk) : undefined,
				...tab.params,
			};
	
			const { data } = await eventService.getEvents(qs.stringify(query));
			dispatch(setEvents([...list, ...data.results]));
			if (data.next && page) {
				dispatch(setPage(page + 1));
			} else {
				dispatch(setPage(null));
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setStatus('idle'));
		}
	}, [dispatch, status, list, page, tab.params, search, tags]);

	return { list, status, hasNext: hasMoreItems, getEvents, search };
};

export default useEventList;
