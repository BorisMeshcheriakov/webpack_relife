import React from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';

import { useAppDispatch } from 'library/hooks/common';
import {
	useProgramEditor,
	// useProgramPublish
} from 'library/hooks/programs';

import { Loader, ModalLarge } from 'library/components/common';
import { UploadProgress } from 'library/components/programs';

import { Head, Title, Nav, Video, Price, Description, Routes, CoachPrice, Tags } from './frames';
import { Card } from 'library/components/ui';

import { openDialogModal } from 'library/redux/modal';
import { Program } from 'library/models/programs';
import { ProgramEditorValues } from 'library/types/programs';

import st from './ModalProgramEditor.module.scss';

type Props = {
	close: () => void;
};

const ModalProgramEditor: React.FC<Props> = ({ close }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const onClose = (program?: Program) => close();

	const onCloseDialog = () => {
		dispatch(
			openDialogModal({
				title: '',
				text: 'Если Вы уйдете с данной страницы, не нажав Готово, изменения не сохранятся.',
				confirmText: 'Уйти',
				declineText: 'Остаться',
				confirm: () => onClose(),
			})
		);
	};

	const { status, onSubmit, uploadStatus, progress, methods } = useProgramEditor(id, onClose);

	const onProgramSubmit = (data: ProgramEditorValues) => {
		if (!data.description) {
			dispatch(
				openDialogModal({
					title: 'Описание',
					text: 'У программы нет описания. Сохранить без него?',
					confirmText: 'Сохранить',
					declineText: 'Добавить описание',
					confirm: () => onSubmit(data),
				})
			);
		} else {
			onSubmit(data);
		}
	};

	return (
		<ModalLarge isOpen onRequestClose={onCloseDialog} disableHeader>
			{status === 'idle' && uploadStatus === 'idle' && (
				<FormProvider {...methods}>
					<form className={st.editor} onSubmit={methods.handleSubmit(onProgramSubmit)}>
						<Head
							title={id === 'new' ? 'Новая программа' : 'Редактирование программы'}
							onClose={onCloseDialog}
						/>

						<div className={st.editor__scroll}>
							<Card className={st.card}>
								<Title />
							</Card>

							<h2 className={st.title}>Описание</h2>
							<Card className={st.card}>
								<Description />
							</Card>

							<h2 className={st.title}>Теги</h2>
							<Card className={st.card}>
								<Tags />
							</Card>

							<Nav />

							<Video />
							<h2 className={st.title}>Стоимость для клиента</h2>
							<Card className={st.card}>
								<Price />
							</Card>
							<h2 className={st.title}>Стоимость для специалиста</h2>
							<Card className={st.card}>
								<CoachPrice />
							</Card>
						</div>
					</form>
					<Routes />
				</FormProvider>
			)}

			{status === 'loading' && <Loader />}

			{uploadStatus === 'loading' && (
				<UploadProgress
					progress={progress}
					title={id === 'new' ? 'Создаем видеопрограмму...' : 'Обновляем видеопрограмму...'}
				/>
			)}
		</ModalLarge>
	);
};

export default ModalProgramEditor;
