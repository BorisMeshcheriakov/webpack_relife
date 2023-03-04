import { programsService } from 'library/api/programsService';
import { Program, ProgramList } from 'library/models/programs';
import { openDialogModal } from 'library/redux/modal';
import { resetUserList, reset } from 'library/redux/programs';
import { useAppDispatch } from '../common';

/**
 * Хук контролирует удаление программы и диалог удаления
 */

interface Props {
	program: Program | ProgramList | null;
	onSuccess: (() => void) | undefined;
}

const useProgramDelete = ({ program, onSuccess }: Props) => {
	const dispatch = useAppDispatch();

	const remove = async () => {
		// Делаем апи-запрос на удаление и удаляем программу из списка
		if (!program) return;

		try {
			await programsService.removeProgram(program?.pk);
			dispatch(resetUserList());
			dispatch(reset());
			if (onSuccess) onSuccess();
		} catch (error) {
			// TODO востановить программу в случае ошибки удаления

			// TODO окно оповещения об ошибке
			console.error();
		}
	};
	const removeProgram = async () => {
		dispatch(
			openDialogModal({
				title: 'Удаление программы',
				text: 'Вы действительно хотите удалить видеопрограмму?',
				confirmText: 'Удалить',
				confirm: () => remove(),
				declineText: 'Оставить',
			})
		);
	};
	return {
		removeProgram,
	};
};

export default useProgramDelete;
