import React from 'react';
import { specialistsService } from 'library/api/specialistsService';
import { Coach } from 'library/models/users';

type Props = {
	id: string | number | null;
};

const useLoadSpecialist = ({ id }: Props) => {
	const [specialist, setSpecialist] = React.useState<Coach | null>(null);

	React.useEffect(() => {
		const getSpecialist = async (id: string | number) => {
			try {
				const response = await specialistsService.getSpecialist(id);
				setSpecialist(response.data);
			} catch (error) {}
		};

		if (id) {
			getSpecialist(id);
		}
		return () => {};
	}, [id]);

	return {
		specialist,
	};
};

export default useLoadSpecialist;
