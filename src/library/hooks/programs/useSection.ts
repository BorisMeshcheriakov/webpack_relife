import React from 'react';

import { CommonTag } from 'library/models/common';

import { programsService } from 'library/api/programsService';

import { setTags } from 'library/redux/programs';

import { useAppDispatch, useErrorHandler } from '../common';
import { useModuleSettings } from '../module';

/**
 * Хук запрашивает настройки (списки тегов), необходимые для работы в секции
 *
 * Для работы необходимо создать common_section в разделе common в панели управления,
 * затем создать module, которому указать code такой же, как и id common_section
 */

const useSection = () => {
	const dispatch = useAppDispatch();
	const { locationRoot } = useModuleSettings();
	const { handleError } = useErrorHandler();

	React.useEffect(() => {
		const getTags = async (id: string | number) => {
			try {
				let tags: CommonTag[] = [];

				const response = await programsService.getVideoTags();
				let results: CommonTag[] = [];
				let section = parseInt(id as string);

				if (!isNaN(section)) {
					results = response.data.filter((tag) => tag.section.id === section);
					tags = [...results];
				}

				dispatch(setTags(tags));
			} catch (error) {
				handleError(error);
			}
		};
		if (locationRoot) getTags(locationRoot);
	}, [locationRoot, dispatch, handleError]);

	return {};
};

export default useSection;
