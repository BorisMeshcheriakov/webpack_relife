import React from 'react';

const useDiploma = () => {
	const [selected, setSelected] = React.useState('');

	const setDiplomaUrl = (url: string) => {
		setSelected(url);
	};

	return {
		selected,
		setDiplomaUrl,
	};
};

export default useDiploma;
