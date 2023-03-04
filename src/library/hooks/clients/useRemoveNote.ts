import { Note } from 'library/models/clients';
import { openDialogModal, showPopup } from 'library/redux/modal';
import { useAppDispatch } from '../common';
import { clientService } from 'library/api/clientService';
import { changeNoteList } from 'library/redux/clients';

const useRemoveNote = (note: Note) => {
	const dispatch = useAppDispatch();

	const remove = async () => {
		try {
			await clientService.removeNote(note.pk);
			dispatch(changeNoteList({ page: 1, list: [], hasNext: true, status: 'idle' }));
			dispatch(showPopup({ type: 'success', text: 'Заметка удалена' }));
		} catch (error) {
			console.error();
			dispatch(showPopup({ type: 'error', text: 'Не удалось удалить заметку' }));
		}
	};

	const removeNote = () => {
		dispatch(
			openDialogModal({
				title: 'Удаление заметки',
				text: 'Вы действительно хотите удалить заметку?',
				confirmText: 'Да, удалить',
				confirm: remove,
				declineText: 'Отмена',
			})
		);
	};
	return {
		removeNote,
	};
};

export default useRemoveNote;
