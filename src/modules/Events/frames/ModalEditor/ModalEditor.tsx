import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ModalLarge } from 'library/components/common';

import { useEditor } from 'library/hooks/events';

import {
	Title,
	Description,
	DateTime,
	Type,
	Cost,
	Discount,
	Video,
	Coach,
	Block,
	Address,
	Contacts,
	Status,
	Tags,
	Actions,
	Prepayment,
} from './frames';

import st from './ModalEditor.module.scss';

const ModalEditor: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { methods, onSubmit, event, video, editorStatus, editFild, mode, showCloseBtn, onClose } =
		useEditor();

	return (
		<ModalLarge isOpen disableHeader onRequestClose={onClose}>
			{(event.status === 'loaded' || !id) && (
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit((data) => onSubmit(data))} className={st.editor}>
						<section className={st.head}>
							<h2>{id ? 'Редактирование мероприятия' : 'Новое мероприятие'}</h2>
							<button type="submit" className={st.submit}>
								Готово
							</button>
							{showCloseBtn && (
								<div className={st.close}>
									<Link to="/events">
										<IconButton className={st.close__btn} type="button">
											<Close />
										</IconButton>
									</Link>
								</div>
							)}
						</section>

						<div className={st.scroll}>
							<Title />

							<Description />

							<Tags />

							<DateTime editFild={editFild} />

							<Type />

							<Cost />

							{(mode === 'O' || !mode) && <Prepayment />}

							<Discount />

							<Video videoInfo={event?.event?.presentation_video} />

							<Coach />

							<Block />

							{mode === 'O' && <Address />}

							<Contacts />

							<Actions />
						</div>
					</form>
				</FormProvider>
			)}
			{((event.status !== 'loaded' && event.status !== 'idle') || editorStatus === 'loading') && (
				<Status />
			)}
			{video.status === 'uploading' && <Status progress={video.progress} />}
		</ModalLarge>
	);
};

export default ModalEditor;
