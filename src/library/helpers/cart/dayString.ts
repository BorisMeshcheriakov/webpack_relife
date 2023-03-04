const dayString = (day: number | undefined) => {
	if (!day) {
		return;
	}

	if (day % 10 === 1) {
		return 'день';
	} else if (day % 10 >= 2 && day % 10 <= 4) {
		return 'дня';
	} else {
		return 'дней';
	}
};

export default dayString;
