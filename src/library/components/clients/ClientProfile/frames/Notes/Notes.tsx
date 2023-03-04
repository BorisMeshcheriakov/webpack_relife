import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useNoteList } from 'library/hooks/clients';

import { Note, ModalNote } from './frames';
import { Blank, Loader } from 'library/components/common';

import st from './Notes.module.scss';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { openNoteModal, selectIsNoteOpen } from 'library/redux/clients';

type Props = {
	id: number;
};

const Notes: React.FC<Props> = ({ id }) => {
	const dispatch = useAppDispatch();
	const { notes, getNotes, hasNext, status } = useNoteList({ id });

	const noteModal = useAppSelector(selectIsNoteOpen);

	return (
		<div className={st.notes}>
			<InfiniteScroll
				className={st.scroller}
				pageStart={1}
				hasMore={hasNext}
				loadMore={getNotes}
				useWindow={false}
			>
				{notes.map((note) => (
					<Note key={note.pk} note={note} />
				))}
			</InfiniteScroll>

			{!notes.length && status === 'loading' && <Loader />}
			{!notes.length && status === 'idle' && <Blank text="Здесь пока нет заметок" />}

			{noteModal.isOpen && (
				<ModalNote
					close={() => dispatch(openNoteModal({ isOpen: false, note: null }))}
					userId={id}
					noteId={noteModal.note}
				/>
			)}
		</div>
	);
};

export default Notes;
