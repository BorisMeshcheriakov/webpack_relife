import React from 'react';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';

import { selectTab, selectProgramsListData, reset, setProgramList } from 'library/redux/programs';

interface Props {
	section: string;
}

const useProgramList = ({ section }: Props) => {
	const dispatch = useAppDispatch();

	const { list, status, hasNext, page, search, tags } = useAppSelector(selectProgramsListData);
	const { request, params } = useAppSelector(selectTab);

	const getPrograms = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) {
			return;
		}

		// dispatch(setStatus('loading'));
		dispatch(setProgramList({ status: 'loading' }));
		try {
			// формируем параметры запроса для выбранной вкладки
			let requestParams: { [key: string]: string | number | number[] } = {
				common_section: section,
				page: page,
				...params,
			};

			// добавляем поисковый запрос и выбранные теги
			if (search) requestParams = { ...requestParams, search: search };
			if (tags) requestParams = { ...requestParams, common_tag: tags };

			const query = qs.stringify(requestParams);

			const response = await request(query);
			if (page === 1) {
				dispatch(setProgramList({ list: response.data.results }));
			} else {
				dispatch(setProgramList({ list: [...list, ...response.data.results] }));
			}

			if (response.data.next) {
				dispatch(setProgramList({ hasNext: true, page: page + 1 }));
			} else {
				dispatch(setProgramList({ hasNext: false }));
			}
		} catch (error) {
			console.error(error);
			dispatch(setProgramList({ hasNext: false }));
		}

		dispatch(setProgramList({ status: 'idle' }));
	}, [status, hasNext, dispatch, section, page, params, search, tags, request, list]);

	React.useEffect(() => {
		// очищаем список программ и параметры при переключении вкладки
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	return {
		programs: list,
		hasMore: hasNext,
		getPrograms,
		status,
		search,
		tags,
	};
};

export default useProgramList;
