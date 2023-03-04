import Modal from 'react-modal';
import { format } from 'date-fns';

import useNote from './hooks/useNote';
import useNoteActions from './hooks/useNoteActions';

import { TextEditor } from './frames';

import st from './ModalNote.module.scss';

const ModalNote = ({ close, userId, noteId }) => {
	const { note, setNote, isLoading, date } = useNote(userId, noteId);

	const onClose = () => close();

	const { handleSave } = useNoteActions(onClose);

	return (
		<Modal
			className={st.modal}
			overlayClassName={st.overlay}
			isOpen={true}
			ariaHideApp={false}
			onRequestClose={close}
		>
			<section className={st.head}>
				<div className={st.head__date}>{format(date, 'dd.MM.yyyy')}</div>
				<div className={st.head__title}>
					{noteId === 'new' ? 'Новая заметка' : 'Редактирование заметки'}
				</div>
				<button className={st.head__save} onClick={() => handleSave(noteId, userId, note)}>
					Сохранить
				</button>
			</section>
			<section className={st.body}>
				{!isLoading && <TextEditor blocks={note} setBlocks={setNote} />}
			</section>
		</Modal>
	);
};

export default ModalNote;
