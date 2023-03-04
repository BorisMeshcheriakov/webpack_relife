import { useState, useRef } from 'react';

import debounce from 'lodash.debounce';

const useDebounce = (callback: (value: string) => void, initial: string) => {
	const [value, setValue] = useState<string>(initial || '');

	const debouncedSave = useRef(debounce((nextValue) => callback(nextValue), 500)).current;

	const handleChange = (inputValue: string) => {
		setValue(inputValue);
		debouncedSave(inputValue);
	};

	return {
		value,
		setValue,
		handleChange,
	};
};

export default useDebounce;
