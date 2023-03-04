export const onChangeValidator = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// Запрещает писать пробелы 1 символом , первый валидный символ будет в верхнем регистре
	let value = e.target.value;
	let restOfString = value.slice(1);
	return value[0] === ' ' ? '' : value.length ? `${value[0].toUpperCase()}${restOfString}` : '';
};
