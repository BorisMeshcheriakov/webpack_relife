const sessionWord = (quantity: number) => {
	let txt = '';
	let count = quantity % 100;
	if (count >= 5 && count <= 20) {
		txt = 'встреч';
	} else {
		count = count % 10;
		if (count === 1) {
			txt = 'встреча';
		} else if (count >= 2 && count <= 4) {
			txt = 'встречи';
		} else {
			txt = 'встреч';
		}
	}
	return txt;
};

export default sessionWord;
