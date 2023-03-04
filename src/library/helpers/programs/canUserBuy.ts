import { Program, ProgramList } from 'library/models/programs';

const canUserBuy = (program: Program | ProgramList) => {
	/**
	 * @individual - содержит данные о подписке на программу.
	 * Наполнен пустыми по умолчанию значениями, а в
	 * ProgramList, если программа ни разу не приобреталась, равен null.
	 *
	 * @is_payed - boolean флаг, была ли программа приобретена
	 *
	 * Запрещаем покупку по умолчанию и проверяем все значения
	 */

	let canBuy = false;
	const { individual, is_payed } = program;
	if (is_payed && individual) {
		const { completed } = individual;
		if (completed) {
			// программа была завершена, можно приобретать
			canBuy = true;
		}
	} else {
		// объект individual равен null - программа ни разу не приобреталась
		canBuy = true;
	}
	return canBuy;
};

export default canUserBuy;
