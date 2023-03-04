export const fieldToUppercase = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	let value = e.target.value;
	let restOfString = value.slice(1);
	return value.length ? `${value[0].toUpperCase()}${restOfString}` : '';
};

export const onChangeValidator = (
	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	value: any,
	onChange: (...event: any[]) => void
) => {
	if (!value) {
		event.target.value = event.target.value.replace(/\s/g, '');
		event.target.value = !!event.target.value[0] ? event.target.value[0].toUpperCase() : '';
	}
	onChange(event.target.value);
};
