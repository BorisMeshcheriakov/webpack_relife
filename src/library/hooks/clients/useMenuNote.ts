import { Note } from 'library/models/clients';
import { MenuAction } from 'library/types/common';

import useEditNote from './useEditNote';
import useRemoveNote from './useRemoveNote';
import { useMenu } from '../common';

const useMenuNote = (note: Note) => {
	const { open, anchorEl, handleClick, handleClose } = useMenu();

	const { editNote } = useEditNote(note);
	const { removeNote } = useRemoveNote(note);

	const change = () => {
		editNote();
		handleClose();
	};

	const remove = () => {
		removeNote();
		handleClose();
	};

	const actions: MenuAction = {
		edit: {
			title: 'Изменить',
			action: change,
		},
		delete: {
			title: 'Удалить',
			action: remove,
		},
	};

	return {
		open,
		anchorEl,
		handleClick,
		handleClose,
		actions,
	};
};

export default useMenuNote;
