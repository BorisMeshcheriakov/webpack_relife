import React from 'react';
import qs from 'query-string';

import { programsService } from 'library/api/programsService';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { useModuleSettings } from 'library/hooks/module';

import {
	selectUserProgramsListData,
	setUserPrograms,
	setUserProgramsStatus,
	setUserProgramsNext,
	setUserProgramsPage,
} from 'library/redux/programs';

/**
 * хук запрашивает список программ продавца и контролирует бесконечный скроллинг
 * программы в этом списке содержат полные данные о видеоупражнениях с кодами видео и т.д.
 */

const useMyProgramList = () => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();

	const { list, status, hasNext, page, search, tags } = useAppSelector(selectUserProgramsListData);

	const getPrograms = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) {
			// Проверяем наличие открытой программы, и блокируем загрузку, чтобы не мешать загрузке упражнений

			// TODO разделить логику загрузки программ и упражнений
			return;
		}

		try {
			dispatch(setUserProgramsStatus('loading'));

			let requestParams: { [key: string]: string | number | number[] } = {
				page: page,
				common_section: locationRoot,
			};

			if (search) requestParams = { ...requestParams, search: search };
			if (tags) requestParams = { ...requestParams, common_tag: tags };

			const query = qs.stringify(requestParams);
			const response = await programsService.getMyPrograms(query);

			if (!response.data) {
				dispatch(setUserProgramsNext(false));
				throw response;
			}

			if (page === 1) {
				dispatch(setUserPrograms(response.data.results));
			} else {
				dispatch(setUserPrograms([...list, ...response.data.results]));
			}

			if (response.data.next) {
				dispatch(setUserProgramsNext(true));
				dispatch(setUserProgramsPage(page + 1));
			} else {
				dispatch(setUserProgramsNext(false));
			}
		} catch (error) {
			console.error(error);
		}
		dispatch(setUserProgramsStatus('idle'));
	}, [status, hasNext, dispatch, page, locationRoot, search, tags, list]);

	return {
		programs: list,
		hasMore: hasNext,
		getPrograms,
		status,
		search,
		tags,
	};
};

export default useMyProgramList;
