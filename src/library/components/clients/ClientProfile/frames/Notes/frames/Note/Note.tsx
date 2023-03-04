import React from 'react';
import { format, parseISO } from 'date-fns';

import { Note as Notemodel } from 'library/models/clients';

import { useMenuNote } from 'library/hooks/clients';

import { Menu } from 'library/components/clients';
import NoteBody from './frames/NoteBody';

import st from './Note.module.scss';

interface Props {
	note: Notemodel;
}

const Note: React.FC<Props> = ({ note }) => {
	const { open, anchorEl, handleClick, handleClose, actions } = useMenuNote(note);
	return (
		<div className={st.note}>
			<span className={st.note__date}>{format(parseISO(note.created), 'dd.MM.yyyy')}</span>
			<div className={st.note__text}>
				<NoteBody blocks={note.noterecord} />
			</div>
			<div className={st.note__menu}>
				<Menu
					open={open}
					handleClick={handleClick}
					handleClose={handleClose}
					anchorEl={anchorEl}
					actions={actions}
				/>
			</div>
		</div>
	);
};

export default Note;
