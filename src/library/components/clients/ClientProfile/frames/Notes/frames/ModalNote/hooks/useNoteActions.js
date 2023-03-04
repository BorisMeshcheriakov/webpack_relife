import { useState } from 'react';
/* eslint-disable */

// import { getProgramsTags } from 'library/services/common/program';
// import { createNewNote, getNote } from 'library/services/specialist/patients';
import { clientService } from 'library/api/clientService';
import { useAppDispatch } from 'library/hooks/common';
import { changeNoteList } from 'library/redux/clients';
// import { removeNote } from 'library/services/specialist/patients';
// import { createNoteBlock } from 'library/services/specialist/patients';
// import { createImageBlock } from 'library/services/specialist/patients';
// import { editNoteBlock } from 'library/services/specialist/patients';
// import { updateNote } from 'library/services/specialist/patients';

const useNoteActions = (onSuccess) => {
	const [result, setResult] = useState({});
	const [saveInProcess, setSaveInProcess] = useState(false);
	const [saveError, setSaveError] = useState('');
	const dispatch = useAppDispatch();

	const checkContent = (note) => {
		// проверяем, есть ли в заметке заполненные блоки
		let content = note
			.map((note) => {
				if (note.text.length > 0) {
					return note.text.replace(/\s/g, '');
				} else if (note.image) {
					return note.image;
				} else {
					return '';
				}
			})
			.filter((item) => item !== '');

		return content.length > 0;
	};

	const createNote = async (clientId) => {
		// setIsLoading(true);
		// let tags = await getProgramsTags().then(res => {
		//   return res.map((tag) => (tag.pk));
		// }).catch(err => {
		//   console.log(err);
		// });

		try {
			let data = {
				patient: clientId,
				tags: ['37'],
			};
			const response = await clientService.createNote(data);
			let note = response.data;

			return note;
		} catch (error) {
			console.error(error);
		}

		// setNote(newNote);
		// setIsLoading(false);
	};

	const uploadImage = async (image, id, index) => {
		let formData = new FormData();
		formData.append('image', image);
		formData.append('note', id);
		formData.append('order', index);
		let newImage = await clientService
			.createNoteImage(formData)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				// setSaveInProcess(false);
				// setSaveError('IMAGE');
				// console.log(err);
				return;
			});

		return newImage;
	};

	const create = async (note, clientId) => {
		setResult({});
		let newNote = await createNote(clientId).then((res) => {
			return res;
		});
		// setSaveError('');
		// setSaveInProcess(true);
		let blocks = [...note];

		// фильтруем пустые блоки
		blocks = blocks.filter((block) => {
			if (!block.imageFile && !block.image && block.text.replace(/\s/g, '') !== '') {
				return block;
			} else if (block.imageFile) {
				return block;
			}
		});

		// подготавливаем блоки к отправке
		blocks = await Promise.all(
			blocks.map(async (block, index) => {
				if (block.text) {
					return { ...block, image: undefined, order: index };
				} else if (block.imageFile) {
					// загружаем каждое изображение

					let image = await uploadImage(block.imageFile, newNote.id, index).then((res) => {
						return { ...res.data, text: undefined };
					});

					return image;
				} else if (block.image) {
					return { ...block, text: undefined, order: index };
				}
			})
		);

		// отправляем изменение
		await clientService
			.updateNote(
				{
					noterecord: blocks,
					patient: clientId,
					tags: ['37'],
				},
				newNote.id
			)
			.then((res) => {
				setResult(res);
				if (onSuccess) {
					onSuccess();
				}
			})
			.catch((err) => {
				// setSaveInProcess(false);
				// setSaveError('CREATE');
				// console.log(err);
				// return;
			});

		setSaveError('');
		setSaveInProcess(false);
	};

	const update = async (noteId, clientId, note) => {
		// setSaveError('');
		// setSaveInProcess(true);

		// фильтруем пустые блоки и убираем ненужные ключи
		let data = await Promise.all(
			note.map(async (block, index) => {
				if (block.text !== null && block.text.replace(/\s/g, '') !== '') {
					return { ...block, image: undefined, order: index };
				} else if (block.imageFile) {
					// загружаем каждое изображение

					let image = await uploadImage(block.imageFile, noteId, index).then((res) => {
						return { ...res.data, text: undefined };
					});
					return image;
				} else if (block.image) {
					return { ...block, text: undefined, order: index };
				}
			})
		);

		data = data.filter((block) => typeof block === 'object');
		// отправляем изменения
		await clientService
			.updateNote(
				{
					noterecord: data,
					patient: clientId,
					tags: ['37'],
				},
				noteId
			)
			.then((res) => {
				setResult(res);
				if (onSuccess) {
					onSuccess();
				}
			})
			.catch((err) => {
				// setSaveInProcess(false);
				// setSaveError('UPDATE');
				// console.log(err);
				// return;
			});

		setSaveInProcess(false);
		setSaveError('');
	};

	const handleSave = (noteId, clientId, note) => {
		if (!noteId && checkContent(note)) {
			create(note, clientId);
		} else {
			update(noteId, clientId, note);
		}
		dispatch(changeNoteList({ page: 1, list: [], hasNext: true, status: 'idle' }));
	};

	return {
		handleSave,
		saveInProcess,
		saveError,
		result,
	};
};

export default useNoteActions;
