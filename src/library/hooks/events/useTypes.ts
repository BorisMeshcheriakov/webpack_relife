import { eventService } from 'library/api/eventService';
import React from 'react';

const useTypes = () => {
	const [types, setTypes] = React.useState<{ id: number; title: string }[]>([]);
	const [status, setStatus] = React.useState<string>('idle');
	const [newType, setNewType] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');

	const getTypes = async () => {
		setStatus('loading');
		try {
			const response = await eventService.getAllTypes();
			if (!response.data) {
				throw response;
			}
			setTypes(response.data);
		} catch (error) {
			// console.log(error);
		}
		setStatus('loaded');
	};

	const onTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (error) setError('');
		setNewType(e.target.value);
	};

	const createType = async (type: string) => {
		try {
			const response = await eventService.createType(type);
			if (!response.data) {
				throw response;
			}

			let allTypes = [...types];
			allTypes.unshift(response.data);
			setTypes(allTypes);
		} catch (e) {
			setError('Не удалось создать новый тип');
		}
	};

	const onEnterDown = (e: React.KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === 'Enter') {
			let existingType = types.find(
				(type) => type.title.toLowerCase() === newType.toLowerCase().trim()
			);
			if (existingType) {
				setError('Такой тип мероприятия уже существует');
			} else {
				setError('');
				let type = newType.trim();
				type = type.charAt(0).toUpperCase() + type.slice(1);
				createType(type);
			}
		}
	};

	React.useEffect(() => {
		getTypes();
	}, []);

	return {
		types,
		status,
		newType,
		onTypeInputChange,
		onEnterDown,
		error,
	};
};

export default useTypes;
