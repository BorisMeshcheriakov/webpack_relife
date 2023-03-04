import React from 'react';
import qs from 'query-string';
import { specialistsService } from 'library/api/specialistsService';
import { useAppDispatch, useAppSelector } from '../common';
import { selectSpecialistsList, selectSpecialistsSearch, setList } from 'library/redux/specialists';
import { showPopup } from 'library/redux/modal';

const useSpecialistList = () => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(selectSpecialistsList);
	const search = useAppSelector(selectSpecialistsSearch);

	const getSpecialists = React.useCallback(async () => {
		let coachList = { ...list };

		if (!coachList.hasMore) {
			return;
		}
		try {
			let requestParams = {
				page: coachList.page,
				search: '',
			};

			if (search) {
				requestParams = { ...requestParams, search: search };
			}

			const query = qs.stringify(requestParams);
			const response = await specialistsService.getSpecialists(query);
			if (coachList.page === 1) {
				coachList = { ...coachList, list: response.data.results };
			} else {
				coachList = { ...coachList, list: [...coachList.list, ...response.data.results] };
			}

			if (response.data.next) {
				coachList = { ...coachList, hasMore: true, page: coachList.page + 1 };
			} else {
				coachList = { ...coachList, hasMore: false };
			}

			dispatch(setList(coachList));
		} catch (err) {
			dispatch(showPopup({ type: 'error', text: 'Не удалось загрузить специалистов' }));
		}
	}, [dispatch, list, search]);

	return {
		getSpecialists,
		list: list.list,
		hasMore: list.hasMore,
		search,
	};
};

export default useSpecialistList;
