import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { Program, ProgramList } from 'library/models/programs';
import { programsService } from 'library/api/programsService';
import {
	useAppDispatch,
	// useAppSelector,
	useCommonSettings,
} from 'library/hooks/common';
import {
	reset,
	resetUserList,
	// selectProgram,
	// setProgram,
	updateProgram,
	updateUserProgram,
} from 'library/redux/programs';
import { openDialogModal, openNotifyModal, openSupportModal } from 'library/redux/modal';

const useProgramPublish = () => {
	const dispatch = useAppDispatch();
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const { id } = useParams<{ id: string }>();

	const { moderation } = useCommonSettings();

	// const activeProgram = useAppSelector(selectProgram);

	const resetLists = () => {
		dispatch(reset());
		dispatch(resetUserList());
	};

	const changeProgramInStore = (program: Program | ProgramList, status: boolean) => {
		// const { pk } = program;
		// if (activeProgram && activeProgram.pk === pk) {
		// 	dispatch(setProgram({ ...activeProgram, published: status } as Program));
		// }
		dispatch(updateProgram({ ...program, published: status } as Program));
		dispatch(updateUserProgram({ ...program, published: status } as Program));
	};

	const changePublication = async (program: Program | ProgramList, status: boolean) => {
		const { pk } = program;
		try {
			changeProgramInStore(program, status);
			return await programsService.updateProgram(pk, { published: status });
		} catch (error) {
			console.error(error);
		}
	};

	const publish = async (program: Program | ProgramList) => {
		// Отправка мероприятия на модерацию
		let message;

		try {
			const response = await changePublication(program, true);
			if (!response?.data) {
				throw response;
			}
			message = moderation
				? 'Видеопрограмма отправлена на модерацию'
				: 'Видеопрограмма опубликована';
		} catch (error) {
			console.error(error);
			message = moderation
				? 'Не удалось отправить программу на модерацию'
				: 'Не удалось опубликоввать программу';
			resetLists();
		}

		dispatch(
			openNotifyModal({
				title: moderation ? 'Модерация' : 'Публикация',
				text: message,
				confirmText: 'Ок',
			})
		);
	};

	const unpublish = async (program: Program | ProgramList) => {
		if (!program.published) return;

		let message;
		try {
			await changePublication(program, false);
			message = 'Видеопрограмма снята с публикации';
		} catch (error) {
			console.error(error);
			message = 'Не удалось снять программу с публикации';
			resetLists();
		}

		dispatch(
			openNotifyModal({
				title: moderation ? 'Модерация' : 'Публикация',
				text: message,
				confirmText: 'Ок',
			})
		);
	};

	const helpDialog = (pk: number) => {
		const helpMessage = `По-видимому, с публикацией Вашей программы возникли проблемы. Возможно она содержит запрещенный контент, либо просто заполнена неправильно. Вы можете отредактировать программу прямо сейчас или связаться с нашей техподдержкой`;
		dispatch(
			openDialogModal({
				title: 'Модерация не пройдена',
				text: helpMessage,
				confirmText: 'Открыть редактор',
				confirm: () => push(id ? `${url}/edit` : `${url}/program/${pk}/edit`),
				declineText: 'Техподдержка',
				decline: () => dispatch(openSupportModal()),
			})
		);
	};

	const showStatus = (program: Program | ProgramList) => {
		// Диалог при нажатии на статус
		if (program) {
			let { published, moderation_status, pk } = program;
			let { abbr_status } = moderation_status;
			let message = '';
			if (published && abbr_status === 'N') {
				message = 'Осталось подождать, пока наши модераторы проверяют программу';
				dispatch(
					openNotifyModal({
						title: 'Модерация',
						text: message,
						confirmText: 'Ок',
					})
				);
			} else if (published && abbr_status === 'D') {
				message = program.moderation_status.comment;
				dispatch(
					openNotifyModal({
						title: 'Модерация не пройдена',
						text: message ? `Причина: ${message}` : 'Программа не прошла модерацию',
						confirmText: 'Что мне делать?',
						confirm: () => helpDialog(pk),
					})
				);
			}
		}
	};

	const publishDialog = (program: Program | ProgramList) => {
		dispatch(
			openDialogModal({
				title: 'Модерация',
				text: 'Вы действительно хотите опубликовать видеопрограмму?',
				confirmText: 'Опубликовать',
				confirm: () => publish(program),
				declineText: 'Отмена',
			})
		);
	};

	const unpublishDialog = (program: Program | ProgramList) => {
		if (!program.published) return;

		dispatch(
			openDialogModal({
				title: 'Модерация',
				text: 'Вы действительно хотите снять видеопрограмму с публикации?',
				confirmText: 'Снять',
				confirm: () => unpublish(program),
				declineText: 'Отмена',
			})
		);
	};

	return {
		publishDialog,
		publish,
		unpublish,
		unpublishDialog,
		showStatus,
	};
};

export default useProgramPublish;
