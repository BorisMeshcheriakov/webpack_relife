import useProgram from './useProgram';

import { ProgramEditorValues } from 'library/types/programs';
import { Program } from 'library/models/programs';

import { useProgramUpload, useProgramForm } from 'library/hooks/programs';
import { useModuleSettings } from 'library/hooks/module';
import { useAppDispatch, useAppSelector, useErrorHandler } from 'library/hooks/common';

import {
	selectProgramVideos,
	setSelectedTab,
	addUserProgram,
	reset,
	selectTab,
	addProgram,
} from 'library/redux/programs';
import { showPopup } from 'library/redux/modal';
import { AxiosResponse } from 'axios';

/**
 * Хук управляет окном "Редактирование программы"
 * @param id уникальный id программы
 * @param close действия, выполняемые при закрытии окна
 *
 */

const useProgramEditor = (id: string, close?: (program?: Program) => void) => {
	const dispatch = useAppDispatch();

	const videos = useAppSelector(selectProgramVideos);
	const tab = useAppSelector(selectTab);
	const isAuthor = true;

	const { locationRoot, moduleSettings } = useModuleSettings();
	const { program, status } = useProgram(id, isAuthor);
	const { methods } = useProgramForm({
		program: program,
	});
	const { createProgram, updateProgram, uploadStatus, progress } = useProgramUpload(id);
	const { handleError } = useErrorHandler();

	const onSubmit = async (data: ProgramEditorValues) => {
		if (!videos.length) {
			dispatch(showPopup({ type: 'error', text: 'Добавьте хотя бы одно упражнение' }));
			return;
		}

		try {
			let response: AxiosResponse<Program>;
			if (id === 'new') {
				response = await createProgram(data, locationRoot);
			} else {
				response = await updateProgram(data);
			}

			if (!response.data) {
				throw response;
			}

			// Обновляем данные в списках программ
			dispatch(addUserProgram(response.data));

			if (tab.title === 'Мои') {
				dispatch(addProgram(response.data));
			} else {
				dispatch(reset());
			}

			// При наличии библиотеки в разделе переключаемся на вкладку "Мои"
			if (!moduleSettings?.library && tab.title !== 'Мои') {
				dispatch(setSelectedTab('Мои'));
			}

			dispatch(
				showPopup({
					type: 'success',
					text: `Видеопрограмма успешно ${id === 'new' ? 'создана' : 'обновлена'}`,
				})
			);
			if (close) close(response.data);
		} catch (error) {
			console.error(error);
			handleError(error);
		}
	};

	return {
		program,
		status,
		onSubmit,
		uploadStatus,
		progress,
		methods,
	};
};

export default useProgramEditor;
