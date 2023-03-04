import React from 'react';
import qs from 'query-string';

import { programsService } from 'library/api/programsService';

import { useAppDispatch, useAppSelector } from '../common';
import { useModuleSettings } from 'library/hooks/module';

import {
	setVideoListStatus,
	setVideos,
	setVideoListPage,
	setVideoListHasNext,
	selectVideoListData,
} from 'library/redux/programs';

const useVideoList = () => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();

	const { page, hasNext, status, videoTags, videoSearch, list } =
		useAppSelector(selectVideoListData);

	const getVideos = React.useCallback(async () => {
		if (status === 'loading' || !hasNext) {
			return;
		}

		dispatch(setVideoListStatus('loading'));
		try {
			let params: { page: number; common_section: string; search?: string; common_tag?: number[] } =
				{
					page: page,
					common_section: locationRoot,
				};

			if (videoSearch) params = { ...params, search: videoSearch };
			if (videoTags) params = { ...params, common_tag: videoTags };

			const query = qs.stringify(params);

			const response = await programsService.getVideos(query);
			dispatch(setVideos([...list, ...response.data.results]));

			if (response.data.next) {
				dispatch(setVideoListHasNext(true));
				dispatch(setVideoListPage(page + 1));
			} else {
				dispatch(setVideoListHasNext(false));
			}
		} catch (error) {
			console.error(error);
		}
		dispatch(setVideoListStatus('idle'));
	}, [status, hasNext, dispatch, page, locationRoot, videoSearch, videoTags, list]);

	return {
		videos: list,
		hasMore: hasNext,
		getVideos,
		tags: videoTags,
		search: videoSearch,
	};
};

export default useVideoList;
