import React from 'react';

// import { getProgramsTags } from 'library/services/common/program';
// import { createNewNote, getNote } from 'library/services/specialist/patients';
import { clientService } from 'library/api/clientService';
import { NoteRecord } from 'library/models/clients';
import { parseISO } from 'date-fns';

const useNote = (clientId: number, noteId: number | string) => {
	const [note, setNote] = React.useState<NoteRecord[]>([]);
	const [date, setDate] = React.useState(new Date());
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		const getNoteData = async (id: number | string) => {
			if (id === 'new') {
				return;
			}

			setIsLoading(true);

			try {
				const response = await clientService.getNote(id);
				let note = response.data.noterecord.sort((a, b) => (a.order > b.order ? 1 : -1));
				setNote(note);
				setDate(parseISO(response.data.created));
			} catch (error) {
				console.error(error);
			}

			// старый апи загрузки заметки
			// let note = await clientService
			// 	.getNote(id)
			// 	.then((res) => {
			// 		let blocks = res.noterecord.sort((a, b) => (a.order > b.order ? 1 : -1));
			// 		console.log(blocks);
			// 		if (blocks[blocks.length - 1].image && blocks[blocks.length - 1].text === null) {
			// 			blocks.push({ text: '', order: blocks[blocks.length - 1].order + 1 });
			// 		}

			// 		res = { ...res, noterecord: blocks };
			// 		return res;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

			// let data = note.noterecord.sort((a, b) => (a.order > b.order ? 1 : -1));
			// note = { ...note, noterecord: data };

			// setNote(note);
			setIsLoading(false);
		};

		if (clientId && noteId) {
			getNoteData(noteId);
		}
	}, [clientId, noteId]);

	return {
		note,
		setNote,
		date,
		isLoading,
	};
};

export default useNote;
