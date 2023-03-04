import { Program, ProgramList } from 'library/models/programs';
import { programsService } from 'library/api/programsService';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { removeProgram, reset, selectTab, setProgram, updateProgram } from 'library/redux/programs';
import { showPopup } from 'library/redux/modal';

/**
 *
 * @param program объект программы
 *
 * хук управляет добавлением/удалением программ в избранное
 * если пользователь снял отметку избранной программы, находясь на вкладке "избранное",
 * программу нужно удалить из списка избранных
 *
 * сама отметка "программа в избранном" служит чем-то вроде закладки для программ,
 * которые пользователь собирается в будущем покупать
 *
 * соответственно, пользователь не может добавлять в избранное свои собственные программы
 */

interface Props {
	program: Program | ProgramList | null;
}

const useFavorite = ({ program }: Props) => {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(selectTab);

	const addToFavorite = async () => {
		if (!program) return;

		try {
			dispatch(setProgram({ ...program, favorite: true } as Program));
			dispatch(updateProgram({ ...program, favorite: true } as Program));
			const res = await programsService.makeProgramFavorite(program.pk);
			dispatch(showPopup({ type: 'success', text: 'Программа добавлена в избранное' }));
			if (res.status !== 201) {
				throw res;
			}
		} catch (error) {
			console.error(error);
			dispatch(setProgram({ ...program, favorite: false } as Program));
			dispatch(reset());
			dispatch(showPopup({ type: 'error', text: 'Не удалось добавить программу в избранное' }));
		}
	};

	const removeFromFavorite = async () => {
		if (!program) return;

		try {
			dispatch(setProgram({ ...program, favorite: false } as Program));
			if (tab.title === 'Избранные') {
				dispatch(removeProgram(program.pk));
			} else {
				dispatch(updateProgram({ ...program, favorite: false } as Program));
			}
			await programsService.removeProgramFromFavorite(program.pk);
			dispatch(showPopup({ type: 'success', text: 'Программа удалена из избранного' }));
		} catch (error) {
			console.error(error);
			dispatch(setProgram({ ...program, favorite: true } as Program));
			dispatch(reset());
			dispatch(showPopup({ type: 'error', text: 'Не удалось удалить программу из избранного' }));
		}
	};

	return {
		addToFavorite,
		removeFromFavorite,
	};
};

export default useFavorite;
