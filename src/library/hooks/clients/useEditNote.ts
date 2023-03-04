import { Note } from 'library/models/clients';
import { openNoteModal } from 'library/redux/clients';
import { useAppDispatch } from '../common';

const useEditNote = (note: Note) => {
	const dispatch = useAppDispatch();

	const editNote = () => dispatch(openNoteModal({ isOpen: true, note: note.pk }));
	return {
		editNote,
	};
};

export default useEditNote;
